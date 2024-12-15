/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GloabalApi";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";

const InfoSection = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            GetPlacePhoto();
        }
    }, [trip?.userSelection?.location?.label]);

    const GetPlacePhoto = async () => {
        try {
            const data = {
                textQuery: trip.userSelection.location.label,
            };
            const result = await GetPlaceDetails(data);

            const photos = result?.data?.places?.[0]?.photos || [];
            if (photos.length > 0) {
                const photoName = photos[3]?.name || photos[0]?.name; // Fallback to the first photo if the 4th doesn't exist
                const photourl = PHOTO_REF_URL.replace("{NAME}", photoName);
                setPhotoUrl(photourl);
            } else {
                console.warn("No photos found for:", trip.userSelection.location.label);
                setPhotoUrl("/path/to/placeholder.jpg"); // Fallback placeholder image
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl("/path/to/placeholder.jpg"); // Fallback placeholder image
        }
    };

    return (
        <div>
            <img
                src={photoUrl }
                alt="Location"
                className="w-full h-[300px] object-cover rounded-lg"
            />
            <div>
                <h1 className="font-bold py-2 text-2xl">{trip?.userSelection?.location?.label}</h1>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-3 md:gap-5 py-3">
                        <h2 className="py-1 md:py-2 px-3 md:px-5 bg-gray-200 rounded-full text-sm md:text-base text-gray-500">
                            🗓️ {trip?.userSelection?.Days} Days
                        </h2>
                        <h2 className="py-1 md:py-2 px-3 md:px-5 bg-gray-200 rounded-full text-sm md:text-base text-gray-500">
                            💸 {trip?.userSelection?.Budget} Budget
                        </h2>
                        <h2 className="py-1 md:py-2 px-3 md:px-5 bg-gray-200 rounded-full text-sm md:text-base text-gray-500">
                            👤 No of Travellers: {trip?.userSelection?.People}
                        </h2>
                    </div>
                    <Link
                        to={
                            "https://www.google.com/maps/search/?api=1&query=" +
                            encodeURIComponent(trip?.userSelection?.location?.label || "")
                        }
                        target="_blank"
                    >
                        <Button title="Open in Google Maps">
                            <IoIosSend />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
