"use client";

import * as React from "react";
import { Star, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFeedbackStore } from "@/store";
import { useUserStore } from "@/store";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const [rating, setRating] = React.useState(0);
  const [hoveredRating, setHoveredRating] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { userId } = useUserStore();
  const { addFeedback } = useFeedbackStore();

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (!open) {
      // Delay reset to avoid flicker during close animation
      const timer = setTimeout(() => {
        setRating(0);
        setMessage("");
        setIsSubmitted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    
    addFeedback({
      type: rating >= 4 ? "improvement" : "bug",
      message: message.trim(),
      rating: rating,
    }, userId);
    
    setIsSubmitted(true);
  };

  const getFeedbackLabel = () => {
    if (rating === 0) return null;
    if (rating <= 3) return "What frustrated you or felt confusing?";
    return "What did you like the most?";
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[560px] p-12 rounded-[24px] border-none shadow-xl flex flex-col items-center text-center gap-6">

          <div className="w-32 h-32 rounded-full bg-[#FFF9C4] flex items-center justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-[#FFF59D] flex items-center justify-center">
              <Star className="w-12 h-12 fill-[#FBC02D] text-[#FBC02D]" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-[28px] font-bold text-gray-900">
              Thank you for your feedback!!
            </h2>
            <p className="text-[17px] text-gray-400 leading-relaxed max-w-[420px] mx-auto">
              Our team reviews every suggestion to improve AI responses, workflows, and overall experience.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] p-8 rounded-[20px] border-none shadow-xl gap-0">
        <DialogHeader className="text-left mb-8">
          <DialogTitle className="text-[28px] font-bold text-gray-900 mb-1">
            Give Feedback
          </DialogTitle>
          <DialogDescription className="text-[16px] text-gray-400">
            Describe your experience using Hintro...
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={cn(
                    "w-12 h-12 transition-colors duration-200",
                    (hoveredRating || rating) >= star
                      ? "fill-[#FFC107] text-[#FFC107]"
                      : "text-[#E0E0E0]"
                  )}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <div className="w-full space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[15px] font-semibold text-[#8C8C8C]">
                {getFeedbackLabel()}
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[160px] rounded-lg border-gray-100 bg-white focus:ring-1 focus:ring-gray-200 resize-none text-gray-900 text-[15px] p-4"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-12">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 px-6 rounded-lg border-gray-300 text-gray-900 font-bold gap-2 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={cn(
              "h-11 px-8 rounded-lg font-bold text-white transition-all",
              rating === 0 
                ? "bg-gray-400 cursor-not-allowed opacity-70" 
                : message.trim().length > 0 
                  ? "bg-black hover:bg-black/90" 
                  : "bg-[#757575] hover:bg-[#616161]"
            )}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
