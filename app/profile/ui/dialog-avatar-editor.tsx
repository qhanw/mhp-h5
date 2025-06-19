"use client";

import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Bold } from "lucide-react";

export function DialogAvatarEditor() {
  const [open, setOpen] = React.useState(false);
  const editorRef = useRef<AvatarEditor | null>(null);

  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setOpen(true);
    e.target.value = ""; // 清空当前值，确保即使选相同文件也能触发 onChange
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataURL = canvas.toDataURL();

      // 转为 Blob (推荐)
      // canvas.toBlob(
      //   async (blob) => {
      //     if (blob) {
      //       const formData = new FormData();
      //       formData.append("avatar", blob, "avatar.jpg");
      //       // 3. 上传到服务器
      //       // const response = await axios.post("/api/upload-avatar", formData, {
      //       //   headers: {
      //       //     "Content-Type": "multipart/form-data",
      //       //   },
      //       // });

      //       // console.log("上传成功:", response.data);
      //     }
      //   },
      //   "image/png",
      //   0.92
      // ); // 0.92 是 JPEG 质量

      console.log("Avatar dataURL:", dataURL);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2 items-center">
        <Avatar className="mr-3 size-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* <DialogTrigger asChild></DialogTrigger> */}

        <Button variant="outline" size="sm" asChild>
          <Label htmlFor="picture">
            Upload photo
            <Input
              id="picture"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
          </Label>
        </Button>
        <Button variant="destructive" size="sm">
          Remove
        </Button>
      </div>

      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Crop your new profile picture</DialogTitle>
          <DialogDescription>
            Make changes to your profile picture here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <AvatarEditor
            className="!w-full !h-full rounded-lg"
            ref={editorRef}
            image={image || ""}
            width={256}
            height={256}
            border={50}
            borderRadius={125}
            color={[0, 0, 0, 0.65]} // RGBA
            scale={scale}
            rotate={rotate}
          />
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <span>Zoom:</span>
            <Slider
              value={[scale]}
              min={1}
              max={2}
              step={0.001}
              onValueChange={(value) => setScale(value[0])}
            />
            <span>Rotation:</span>
            <Slider
              value={[rotate]}
              min={0}
              max={180}
              step={0.01}
              onValueChange={(value) => setRotate(value[0])}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
