import express from "express";
import Razorpay from "razorpay";
import {v4 as uuid} from "uuid";
const crypto = require("crypto");

//Database Modal
import { EventModel } from "../../database/Events";
import PaymentModel from "../../database/payments";

const Router = express.Router();

// const instance = new Razorpay({
//   key_id: "rzp_live_gN88e4C0ndRhfx",
//   key_secret: "V0fx6SYgRDzVPpm1sGnP5jZl",
// });
http://localhost:4000/payment/order
Router.get("/getRZPKEY", async (req, res) => {
    try {
        return res.status(200).json({key: "rzp_test_6cbtZxwHMpD5pu"})
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }
})

Router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: "rzp_test_6cbtZxwHMpD5pu",
  key_secret: "3vFegrkBRknwobEJEZZj5vQs",
// 			key_id: "rzp_live_gN88e4C0ndRhfx",
//   key_secret: "V0fx6SYgRDzVPpm1sGnP5jZl",
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

Router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const data = req.body;
        console.log({razorpay_order_id, razorpay_payment_id, razorpay_signature});
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", "3vFegrkBRknwobEJEZZj5vQs")
			.update(sign.toString())
			.digest("hex");

        if (razorpay_signature === expectedSign) {  
            
			return res.status(200).json({ message: "Payment verified successfully", data:data  });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log(error);
	}
});


export default Router;




// Router.post("/new", async (req, res) => {
//     try {
//       // const  instance = new Razorpay({
//       //     key_id: process.env.RZR_PAY_ID,
//       //     key_secret: process.env.RZR_PAY_SECRET
//       // })
//       var options = {
//         amount: req.body.amount * 100,
//         currency: "INR",
//         receipt: `${uuid()}`,
//       };
//       const data = await instance.orders.create(options);
//       return res.json({ data });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  