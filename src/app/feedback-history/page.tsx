"use client";

import * as React from "react";
import { Star, MessageSquare } from "lucide-react";
import { useFeedbackStore, useUserStore } from "@/store";
import type { Feedback } from "@/types";
import { cn } from "@/lib/utils";
import { formatDateFull, formatTime } from "@/lib/formatters";

interface FeedbackWithTitle extends Feedback {
  title?: string;
}

function FeedbackCardMobile({
  feedback,
  onDelete,
}: {
  feedback: FeedbackWithTitle;
  onDelete: () => void;
}) {
  const title = feedback.message.split(" ").slice(0, 5).join(" ") + "...";
  const description = feedback.message;
  const dateStr = formatDateFull(feedback.createdAt);
  const timeStr = formatTime(feedback.createdAt).replace(" at ", ", ");
  const rating = feedback.rating || 0;

  return (
    <div 
      className="bg-white border border-gray-100 rounded-xl p-4 space-y-2 hover:bg-gray-50/50 transition-colors cursor-pointer" 
      onClick={onDelete}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 flex-1">
          {title}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-3.5 w-3.5",
                star <= rating
                  ? "fill-[#FBC02D] text-[#FBC02D]"
                  : "text-gray-200"
              )}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
      <span className="text-xs" style={{ color: "#6686FF" }}>
        {dateStr}, {timeStr}
      </span>
    </div>
  );
}

function FeedbackTableRow({
  feedback,
  onDelete,
}: {
  feedback: FeedbackWithTitle;
  onDelete: () => void;
}) {
  const title = feedback.message.split(" ").slice(0, 3).join(" ") + "...";
  const description = feedback.message;
  const rating = feedback.rating || 0;
  const dateStr = formatDateFull(feedback.createdAt);
  const timeStr = formatTime(feedback.createdAt).replace(" at ", ", ");

  return (
    <tr 
      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
      onClick={onDelete}
    >
      <td className="py-4 px-4">
        <span className="text-sm font-medium text-gray-900">{title}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm font-medium text-gray-700">{rating}/5</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-gray-600">{description}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-gray-600">{dateStr}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-gray-500">{timeStr}</span>
      </td>
    </tr>
  );
}

export default function FeedbackHistoryPage() {
  const { userId } = useUserStore();
  const { getUserFeedback, removeFeedback } = useFeedbackStore();

  const userFeedback = React.useMemo(() => {
    return getUserFeedback(userId);
  }, [userId]);

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <div>
        <h2 className="text-[20px] sm:text-xl font-semibold text-gray-900">
          Feedback History
        </h2>
        <p className="text-[13px] sm:text-sm text-gray-500 mt-1">
          Browse your previous feedback submissions
        </p>
      </div>

      {userFeedback.length > 0 ? (
        <div className="space-y-4">
          {/* Desktop Table View - hidden on mobile */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">
                    Title
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">
                    Rating
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">
                    Description
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {userFeedback.map((feedback) => (
                  <FeedbackTableRow
                    key={feedback.id}
                    feedback={feedback}
                    onDelete={() => removeFeedback(feedback.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - hidden on desktop */}
          <div className="md:hidden space-y-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Review your previous feedbacks</p>
            {userFeedback.map((feedback) => (
              <FeedbackCardMobile
                key={feedback.id}
                feedback={feedback}
                onDelete={() => removeFeedback(feedback.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-gray-100 rounded-[20px] text-center">
          <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-6">
            <MessageSquare className="h-6 w-6 text-[#4F46E5]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Feedback Yet
          </h3>
          <p className="text-sm text-gray-500 max-w-[420px] leading-relaxed">
            You haven&apos;t submitted any feedback yet. Share your thoughts to help us improve!
          </p>
        </div>
      )}
    </div>
  );
}