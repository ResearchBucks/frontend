"use client";

import React from "react";

// Type definitions
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange" | "red" | "indigo";
  isLoading?: boolean;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

// Individual Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
  isLoading = false,
  change,
  changeType = "neutral",
}) => {
  const getColorClasses = () => {
    const colorMap = {
      blue: {
        accent: "border-t-blue-500",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
      },
      green: {
        accent: "border-t-green-500",
        iconBg: "bg-green-50",
        iconColor: "text-green-500",
      },
      purple: {
        accent: "border-t-purple-500",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
      },
      orange: {
        accent: "border-t-orange-500",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
      },
      red: {
        accent: "border-t-red-500",
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
      },
      indigo: {
        accent: "border-t-indigo-500",
        iconBg: "bg-indigo-50",
        iconColor: "text-indigo-500",
      },
    };
    return colorMap[color];
  };

  const getChangeClasses = () => {
    const changeMap = {
      positive: "text-green-600",
      negative: "text-red-600",
      neutral: "text-slate-500",
    };
    return changeMap[changeType];
  };

  const colors = getColorClasses();

  return (
    <div
      className={`relative bg-white rounded-2xl p-6 shadow-lg border border-slate-100 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl border-t-4 ${colors.accent} group`}
    >
      {/* Card Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Icon Container */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.iconBg} ${colors.iconColor} transition-transform duration-200 group-hover:scale-110`}
        >
          {icon}
        </div>

        {/* Card Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2 leading-none">
            {title}
          </h3>
          <div className="text-3xl md:text-4xl font-bold text-slate-800 leading-none transition-transform duration-200 group-hover:scale-105">
            {isLoading ? (
              <div className="animate-pulse bg-slate-200 h-10 w-20 rounded"></div>
            ) : typeof value === "number" ? (
              value.toLocaleString()
            ) : (
              value
            )}
          </div>
        </div>
      </div>

      {/* Card Footer - Change indicator */}
      {change && !isLoading && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div
            className={`flex items-center gap-2 text-sm font-semibold ${getChangeClasses()}`}
          >
            <span className="font-bold">{change}</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            vs last period
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
