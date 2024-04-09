const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");

const {
  createBooking,
  getAllBookings,
  getAllPastBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingsByDate,
  getUserBookings,
  getPastUserBookings,
  getRecentBookings,
  getRecentNgoBookings,

} = require("../controller/booking-controller");

router.post("/create", userAuth, createBooking);
router.get("/all/:role", getAllBookings);
router.get("/all/past/:role", getAllPastBookings);
router.get("/recent", getRecentBookings);
router.get("/ngo/recent", getRecentNgoBookings);
router.get("/:role/:id", userAuth, getUserBookings);
router.get("/:role/past/:id", userAuth, getPastUserBookings);
router.get("/:id", getBookingById);
router.put("/:id", userAuth, updateBooking);
router.delete("/:id", userAuth, deleteBooking);
router.get("/date/:date", getBookingsByDate);



module.exports = router;
