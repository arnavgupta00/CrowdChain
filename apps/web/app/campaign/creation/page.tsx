"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { DatePicker } from "../../../components/ui/date-picker";
import { FileUpload } from "../../../components/ui/file-upload";
import toast from "react-hot-toast";
import { addCampaign } from "../../../actions/user";
import { useRouter } from "next/navigation";


export default function CampaignCreation() {
  const [isPreview, setIsPreview] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      walletAddress: "",
      goal: 0,
      image: "",
      documents: [],
    },
  });

  const watchedFields = watch();
  const router = useRouter();

  const onSubmit = async (data:any) => {
    try {
      // Here you would typically call your API to create the campaign
      // and trigger the smart contract deployment
      console.log("Submitting campaign:", data);
      const token = localStorage.getItem("token") as string;
      const { category, deadline, description, goal, image, title, walletAddress } = data;
      const res = await addCampaign(token, category, deadline, description, goal, title, walletAddress);
      if (res.success) {
        toast.success(
          "Your campaign has been successfully created and deployed."
        );  
        router.push(`/campaigns`);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      //   toast({
      //     title: "Error",
      //     description: "There was an error creating your campaign. Please try again.",
      //     variant: "destructive",
      //   })

      toast.error(
        "There was an error creating your campaign. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Create a New Campaign</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Campaign Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="title"
                    {...field}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                )}
              />
              
            </div>
            <div>
              <Label htmlFor="title">Wallet Address</Label>
              <Controller
                name="walletAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    id="walletAddress"
                    {...field}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                )}
              />
         
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    {...field}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                )}
              />
            
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    options={[
                      { label: "Technology", value: "technology" },
                      { label: "Art", value: "art" },
                      { label: "Music", value: "music" },
                      { label: "Film", value: "film" },
                      { label: "Games", value: "games" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select a category"
                  />
                )}
              />
             
            </div>

            <div>
              <Label htmlFor="goal">Funding Goal ($)</Label>
              <Controller
                name="goal"
                control={control}
                render={({ field }) => (
                  <Input
                    id="goal"
                    type="number"
                    {...field}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                )}
              />
        
            </div>

            <div>
              <Label htmlFor="deadline">Campaign Deadline</Label>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => <DatePicker {...field} />}
              />
             
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Campaign Image</Label>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <FileUpload {...field} accept="image/*" />
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPreview ? "Edit Campaign" : "Preview Campaign"}
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Create Campaign
          </Button>
        </div>
      </form>

      {isPreview && (
        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Campaign Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold mb-2">{watchedFields.title}</h2>
            <p className="text-gray-300 mb-4">{watchedFields.description}</p>
            <p className="text-gray-400">Category: {watchedFields.category}</p>
            <p className="text-gray-400">Goal: ${watchedFields.goal}</p>
            <p className="text-gray-400">
              Deadline: {watchedFields.deadline.toDateString()}
            </p>
            {watchedFields.image && (
              <p className="text-gray-400">Image uploaded: Yes</p>
            )}
            {watchedFields.documents && watchedFields.documents.length > 0 && (
              <p className="text-gray-400">
                Documents uploaded: {watchedFields.documents.length}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
