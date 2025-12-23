import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useWatch } from "react-hook-form";

export default function PostForm({ post }) {
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || slugTransform(post?.title || ""),  // ✅ FIXED: Use post.slug or transform title
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  
  // const [isSlugTouched, setIsSlugTouched] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(
    post ? appwriteService.getFilePreview(post.featuredImage) : null
  );

  const navigate = useNavigate();
  // const userData = useSelector((state) => state.auth.userData);
  const userData = useSelector((state) => state.auth.userData?.userData);

  // const submit = async (data) => {
  //   try {
  //     let featuredImageId = null;

  //     if (data.image && data.image.length > 0) {
  //       const file = await appwriteService.uploadFile(data.image[0]);
  //       featuredImageId = file?.$id;
  //     }

  //     const postData = {
  //       title: data.title,
  //       slug: data.slug,
  //       content: data.content,
  //       status: data.status,
  //       featuredImage: featuredImageId,
  //       userId: userData.$id, // ✅ now valid
  //     };

  //     const dbPost = await appwriteService.createPost(postData);

  //     if (dbPost) {
  //       navigate(`/post/${dbPost.$id}`);
  //     }
  //   } catch (error) {
  //     console.log("Submit error:", error);
  //   }
  // };

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    // const title = useWatch({
    //   control,
    //   name: "title",
    // });
    // React.useEffect(() => {
    //   if (title && !getValues("slug")) {
    //     setValue("slug", slugTransform(title), { shouldValidate: true });
    //   }
    // }, [title, slugTransform, setValue, getValues]);
    // React.useEffect(() => {
    //   if (title && !isSlugTouched) {
    //     setValue("slug", slugTransform(title), { shouldValidate: true });
    //   }
    // }, [title, isSlugTouched, slugTransform, setValue]);

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title "
          placeholder="Enter post title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        {/* <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        /> 
         */}

        <Input
          label="Slug "
          placeholder="post-url-slug"
          className="mb-4"
          {...register("slug", { required: true })}
          // onChange={() => setIsSlugTouched(true)}
        />

        <RTE
          label="Content "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-full md:w-1/3 px-2">
        <div className="mb-4">
          <label className="inline-block mb-2 pl-1 text-sm font-medium">
            Featured Image 
          </label>
          
          <div className="relative">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
              onChange={(e) => {
                register("image").onChange(e);
                handleImageChange(e);
              }}
            />
            
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-sm text-gray-600">
                {selectedImage || "Choose Image"}
              </span>
            </label>
          </div>

          {!post && !selectedImage && (
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, JPEG or GIF (MAX. 800x400px)
            </p>
          )}
        </div>

        {imagePreview && (
          <div className="w-full mb-4 relative group">
            <img
              src={imagePreview}
              alt={post?.title || "Preview"}
              className="rounded-lg w-full object-cover shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-blue-500" : "bg-blue-500"}
          className="w-full hover:opacity-90 transition-opacity shadow-md"
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}