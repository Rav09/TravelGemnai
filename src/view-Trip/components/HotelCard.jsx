/* eslint-disable react/prop-types */
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GloabalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        try {
            const data = { textQuery: hotel?.name };
            const result = await GetPlaceDetails(data);
            const photoData = result?.data?.places?.[0]?.photos?.[1];
            if (photoData?.name) {
                const photourl = PHOTO_REF_URL.replace("{NAME}", photoData.name);
                setPhotoUrl(photourl);
            } else {
                console.warn("Photo data not found for:", hotel?.name);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
        }
    };

    // Dummy hotel data as fallback
    const dummyHotels = {
        name: "Dummy Hotel",
        address: "123 Dummy Street, Cityville",
        price: "N/A",
        rating: "N/A",
        photoUrl: "https://via.placeholder.com/300x200?text=Dummy+Hotel+Image", // Dummy image
    };

    const hotelName = hotel?.name || dummyHotels.name;
    const hotelAddress = hotel?.address || dummyHotels.address;
    const hotelPrice = hotel?.price || dummyHotels.price;
    const hotelRating = hotel?.rating || dummyHotels.rating;
    const hotelPhoto = photoUrl || hotel?.photoUrl || dummyHotels.photoUrl;

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                hotelName
            )},${encodeURIComponent(hotelAddress)}`}
            target="_blank"
        >
            <div className="hover:scale-105 transition-all cursor-pointer shadow-md shadow-slate-400 rounded-md">
                <img
                    src={hotelPhoto}
                    alt={hotelName}
                    className="rounded-lg w-full h-[150px] xl:h-[180px] object-cover"
                />
                <div className="flex flex-col gap-2 px-2 py-1">
                    <h2 className="line-clamp-1 font-medium">{hotelName}</h2>
                    <h2 className="line-clamp-1 text-xs text-gray-500">📍{hotelAddress}</h2>
                    <h2 className="text-xs xl:text-sm font-semibold line-clamp-1">
                        💰 {hotelPrice}
                    </h2>
                    <h2 className="text-xs xl:text-sm font-semibold">⭐ {hotelRating}</h2>
                </div>
            </div>
        </Link>
    );
};

export default HotelCard;
