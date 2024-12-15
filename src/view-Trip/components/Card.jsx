import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GloabalApi";
import { useEffect, useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Card = ({ place }) => {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (place) GetPlacePhoto();
    }, [place]);

    const GetPlacePhoto = async () => {
        try {
            const data = {
                textQuery: place.placeName,
            };
            const result = await GetPlaceDetails(data);

            const photos = result?.data?.places?.[0]?.photos || [];
            if (photos.length > 0) {
                const photoName = photos[3]?.name || photos[0]?.name; // Fallback to the first photo
                const photourl = PHOTO_REF_URL.replace("{NAME}", photoName);
                setPhotoUrl(photourl);
            } else {
                console.warn("No photos found for:", place.placeName);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
        }
    };

    return (
        <Link
            to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
            target="_blank"
        >
            <div className="flex gap-3">
                <img
                    src={photoUrl || "/path/to/placeholder.jpg"} // Use a placeholder if `photoUrl` is null
                    alt={place.placeName || "Place"}
                    className="w-[110px] h-[150px] object-cover rounded-md"
                />

                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl line-clamp-1">{place.placeName}</h2>
                    <h2 className="line-clamp-2 text-gray-500">{place.placeDetails}</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold line-clamp-1">⏳ {place.timeTravel}</h2>
                            <h2 className="font-semibold">⭐ {place.rating}</h2>
                        </div>
                        <Button onClick={() => console.log("Button clicked")}>
                            <FaMapMarkedAlt className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
