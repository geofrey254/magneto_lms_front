import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaLink } from "react-icons/fa6";

const courseUrl = "https://magneto.com";

const handleCopyLink = () => {
  navigator.clipboard.writeText(courseUrl);
};

function CopyLink() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={handleCopyLink}
        className="flex items-center bg-[#f8d6b6] text-white px-4 py-2 rounded-2xl space-x-2"
      >
        <FaLink />
        <span>copy link</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Linked Copied!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/65 text-xs">
            Share this with your friends and classmates! Magneto is your trusted
            partner in education, offering high-quality, engaging content
            tailored to the Kenyan high school curriculum. Every student
            deserves tools that make learning simple, interactive, and
            effective.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white rounded-2xl">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CopyLink;
