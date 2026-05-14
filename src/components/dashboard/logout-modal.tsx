"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-8 gap-6 rounded-[24px] border-none shadow-lg">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-[20px]  text-gray-900 leading-tight">
            Leaving already?
          </DialogTitle>
          <div className="h-px bg-gray-100 w-full" />
        </DialogHeader>
        
        <DialogDescription className="text-[13px] text-gray-900 leading-relaxed font-medium">
          You can log back in anytime to continue your meetings with Hintro.
        </DialogDescription>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 sm:gap-4 mt-4">
<Button
            variant="outline"
            onClick={onClose}
            className="h-10 w-full sm:w-[180px] rounded-md border border-[#000000] text-gray-900 font-semibold text-[14px] hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="h-10 w-full sm:w-[180px] rounded-md bg-black text-white text-[14px] hover:bg-black/90"
          >
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
