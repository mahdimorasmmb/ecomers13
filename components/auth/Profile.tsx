import React from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";
import UserAddresses from "../user/UserAddress";
import Avatar from "../Avatar";
import Button from "../Button";
import InfoProfile from "./InfoProfile";
import { getServerSession } from "next-auth";

interface Props {
  dataAddresses: [Address];
}

const Profile = async ({ dataAddresses }: Props) => {
  const dataUser = await getServerSession();

  return  (
    <div>
      <figure dir="rtl" className="flex items-start sm:items-center">
        <div className="relative">
          <Avatar
            imageSrc={dataUser?.user?.avatar?.url}
            alt={dataUser?.user?.name}
          />
        </div>
        <InfoProfile session={dataUser || undefined} />
      </figure>

      <hr className="my-4" />

      {dataAddresses && <UserAddresses addresses={dataAddresses} />}

      <div className="flex justify-end">
        <Link href="/address/new">
          <Button
            className="flex items-center gap-2"
            label={
              <>
                <i className="mr-1 fa fa-plus"></i>آدرس جدید اضافه کنید
              </>
            }
          />
        </Link>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default Profile;
