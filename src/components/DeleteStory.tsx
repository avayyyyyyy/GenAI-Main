"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import prisma from "@/utils/db";
import { toast } from "sonner";
import { deleteStory } from "@/actions/DeleteStory";
import { useRouter } from "next/navigation";

const DeleteStory = ({ id }: { id: string }) => {
  const router = useRouter();

  async function DelStory() {
    const { error } = await deleteStory(id);
    if (error) {
      toast.error("Story not deleted!");
      return;
    }
    toast.success("Story deleted successfully!");
    router.refresh();
    return;
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-fit">delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              story and remove your story data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={DelStory}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteStory;
