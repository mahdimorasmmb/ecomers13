import Link from "next/link";
import React from "react";

const UserAddresses = ({ addresses }: { addresses: [Address] }) => {
  return (
    <>
      {addresses?.map((address) => (
        <Link dir="rtl" href={`/address/${address._id}`} key={address._id}>
          <div className="mb-5 gap-4">
            <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
              <div className="mr-3">
                <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
                  <i className="fa fa-map-marker-alt"></i>
                </span>
              </div>
              <figcaption className="text-gray-600 mr-2">
                <p dir="rtl" className="flex  flex-col">
                  <span> {address.street}</span> {address.country},{" "}
                  {address.state}, {address.city} , {address.zipCode},
                  <span>شماره تلفن: {address.phoneNo}</span>
                </p>
              </figcaption>
            </figure>
          </div>
        </Link>
      ))}
    </>
  );
};

export default UserAddresses;
