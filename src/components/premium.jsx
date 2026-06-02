import axios from "axios";
import { PREMIUM_CARD_DATA } from "./data/premium-card-data";
import { BASE_URL } from "./constants";
import { useEffect, useState } from "react";

function Premium() {
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const getPremiumStatus = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/premiumStatus", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsPremiumUser(true);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getPremiumStatus();
  }, []);

  return (
    !isLoading &&
    (isPremiumUser ? (
      <div>
        <p className="text-xl font-bold text-center mt-5">
          You are a Premium User
        </p>
      </div>
    ) : (
      <div className="flex gap-3 p-8">
        {PREMIUM_CARD_DATA.map((cardData) => (
          <PremiumCardDetails
            key={cardData.heading}
            cardData={cardData}
            setIsPremiumUser={setIsPremiumUser}
          />
        ))}
      </div>
    ))
  );
}

export default Premium;

function PremiumCardDetails({ cardData, setIsPremiumUser }) {
  const { heading, price, features, type } = cardData;

  const verifyPayment = async (response) => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });

      if (res.data.success) {
        // based on use case do something
        setIsPremiumUser(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubscribe = async (membershipType) => {
    try {
      const postData = { membershipType };
      const res = await axios.post(BASE_URL + "/payment/create", postData, {
        withCredentials: true,
      });

      const { rzp_keyId, amount, currency, orderId, notes } = res.data;

      // Open Razorpay Checkout
      const options = {
        key: rzp_keyId,
        amount, // Amount is in currency subunits.
        currency,
        name: "Dev Tinder",
        description: "Test Transaction",
        order_id: orderId,
        prefill: {
          name: notes.firstName + notes.lastName,
          email: notes.email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPayment, // Function to handle payment verification. i.e on payment sucesfully completed this function will be called with response from razorpay
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card flex-auto bg-base-200 shadow-md">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">{heading}</h2>
          <span className="text-xl">₹{price}/mo</span>
        </div>

        <ul className="mt-6 flex flex-col gap-2 text-xs"></ul>
        {features.map((feature, index) => (
          <li key={index}>
            <span>{feature}</span>
          </li>
        ))}

        <div className="mt-6 flex justify-center">
          <button
            className="btn btn-primary btn-block w-1/2"
            onClick={() => handleSubscribe(type)}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
