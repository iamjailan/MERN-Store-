import Listing from "../models/ListingModel.js";
import { errorHandler } from "../utils/error.js";

export const createList = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res
      .status(201)
      .json({ success: true, message: "List Created successfully", listing });
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req, res, next) => {
  const listId = await Listing.findById(req.params.id);

  if (!listId) {
    return next(errorHandler(404, "Listing Not found"));
  }

  if (req.user.id !== listId.userRef) {
    return next(errorHandler(401, "You are not allowed for this action"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing Not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You are not allowed for this action!"));
  }

  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  const listingId = await Listing.findById(req.params.id);
  if (!listingId) {
    return next(
      errorHandler(404, `Listing not found with this ${listingId} id`)
    );
  }
  try {
    const oneListing = await Listing.findById(listingId);
    res.status(200).json(oneListing);
  } catch (error) {
    next(error);
  }
};
