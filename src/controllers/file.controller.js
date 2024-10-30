import { User } from "../models/user.model.js";
import { File } from "../models/file.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/uploadToCloudinary";

const uploadNewFile = asyncHandler(async (req, res) => {
    try {
        const id = req?._id;
        if (!id) {
            return res.status(400).json(new ApiError(400, "Id is required"));
        }

        const user = await User.findById(id);
        if (!user) {
            return res
                .status(400)
                .json(new ApiError(400, "User profile not available"));
        }

        const localFilePath = req?.file.path;
        if (!localFilePath) {
            return res.status(400).json(new ApiError(400, "File is required"));
        }

        const file = await uploadOnCloudinary(localFilePath);

        const createFile = await File.create({
            user: id,
            fileDetails: [
                {
                    name: file?.original_filename,
                    url: file?.secure_url,
                    cloudinary_avatar_public_id: file?.public_id,
                    type: file?.format,
                    size: file?.bytes,
                },
            ],
        });

        return res
            .status(200)
            .json(
                new ApiResponse(200, createFile, "File uploaded successfully")
            );
    } catch (e) {
        return res
            .status(500)
            .json(new ApiError(500, "Error while uploading file"));
    }
});

const editFileName = asyncHandler(async (req, res) => {
    try {
        const { public_id, name } = req.body;
        if (!public_id || !name) {
            return res
                .status(400)
                .json(new ApiError(400, "All fields are required"));
        }

        const fileExist = await File.findOne({ public_id });
        if (!fileExist) {
            return res
                .status(400)
                .json(new ApiError(400, "File does not exist"));
        }

        const updatedFile = await File.findByIdAndUpdate(
            fileExist._id,
            {
                name,
            },
            { new: true }
        );

        if (!updatedFile) {
            return res
                .status(400)
                .json(new ApiError(400, "Error while updating file"));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedFile,
                    "File details updated successfully"
                )
            );
    } catch (e) {
        return res
            .status(500)
            .json(
                new ApiResponse(500, {}, "Error while updating file details")
            );
    }
});

const deleteFile = asyncHandler(async (req,res) => {
    try
    {
        const {public_id} = req.body;
        if(!public_id)
        {
            return res.status(400).json(new ApiError(400,"Id is required"));
        }

        const updatedFile = await File.findOneAndDelete({cloudinary_public_id: public_id});
        const response = await deleteFromCloudinary(public_id);
        if(!response)
        {
            return res.status(500).json(new ApiError(500,"Error while deleting file"));
        }
        return res.status(200).json(new ApiResponse(200,{},"File deleted successfully"));
    }
    catch(e)
    {
        return res.status(500).json(new ApiError(500,"Error while deleting file"));
    }
});

const searchFilesByName = asyncHandler(async (req, res) => {
    try {
        const userId = req?._id; // Assuming user ID is available from middleware
        const { name } = req.query; // Capture the search term from the query string

        if (!userId) {
            return res.status(400).json(new ApiError(400, "User ID is required"));
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        // Find files associated with the user and matching the search term
        const files = await File.find({
            user: userId,
            "fileDetails.name": { $regex: name, $options: "i" } // Case-insensitive search
        });

        if (!files || files.length === 0) {
            return res.status(404).json(new ApiError(404, "No files found"));
        }

        return res.status(200).json(new ApiResponse(200, files, "Files retrieved successfully"));
    } catch (e) {
        return res.status(500).json(new ApiError(500, "Error while retrieving files"));
    }
});

const getFileByUser = asyncHandler(async (req,res) => {
    try
    {
        const id = req?.user?._id;
        if(!id)
        {
            return res.status(400).json(new ApiError(400,"All fields are required"));
        }

        const file = await File.find({user: id});
        if(!file)
        {
            return res.status(500).json(new ApiError(500,"Error while fetching data"));
        }

        return res.status(200).json(new ApiResponse(200,file,"Data fetched successfully"));
    }
    catch(e)
    {
        return res.status(500).json(new ApiError(500,"Error while fetching data"));
    }
});

export { uploadNewFile, editFileName, deleteFile, searchFilesByName, getFileByUser };