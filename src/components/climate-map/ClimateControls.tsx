import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, Info } from "lucide-react";
import { MONTHS } from "./climateData";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClimateControlsProps {
  month: number;
  variable: "high" | "low";
  onMonthChange: (month: number) => void;
  onVariableChange: (variable: "high" | "low") => void;
  onReset: () => void;
}

const ClimateControls = ({
  month,
  variable,
  onMonthChange,
  onVariableChange,
  onReset,
}: ClimateControlsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Month selector */}
      <Select
        value={String(month)}
        onValueChange={(v) => onMonthChange(Number(v))}
      >
        <SelectTrigger className="w-[150px] bg-card border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m, i) => (
            <SelectItem key={i} value={String(i)}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* High / Low toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden">
        <button
          onClick={() => onVariableChange("high")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            variable === "high"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          Avg High
        </button>
        <button
          onClick={() => onVariableChange("low")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            variable === "low"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          Avg Low
        </button>
      </div>

      {/* Info tooltip */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Info size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[250px]">
          <p className="text-xs">
            <strong>Average High:</strong> Typical daytime maximum temperature.
            <br />
            <strong>Average Low:</strong> Typical overnight minimum temperature.
          </p>
        </TooltipContent>
      </Tooltip>

      {/* Reset button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="ml-auto"
      >
        <RotateCcw size={14} />
        <span className="hidden sm:inline ml-1">Reset</span>
      </Button>
    </div>
  );
};

export default ClimateControls;
