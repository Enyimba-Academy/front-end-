"use client";

import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { DraftStatus } from "@/constant/draftstatus";

export default function CourseSettings({ showErrors, onContinue, onBack }) {
  const { values, errors, handleChange, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Course Settings</h2>
        <p className="text-gray-500 mb-6">
          Configure pricing and visibility settings for your course.
        </p>
      </div>

      {showErrors && (errors.visibility || (values.isPaid && errors.price)) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fix the errors below before continuing.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="isPaid" className="text-base">
              Paid Course
            </Label>
            <Switch
              id="isPaid"
              checked={values.isPaid}
              onCheckedChange={(checked) => setFieldValue("isPaid", checked)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Enable this option if you want to charge for your course
          </p>
        </div>

        {values.isPaid && (
          <div>
            <Label htmlFor="price" className="text-base">
              Course Price <span className="text-red-500">*</span>
            </Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₦</span>
              </div>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={values.price}
                onChange={handleChange}
                className={`pl-8 ${
                  showErrors && errors.price ? "border-red-500" : ""
                }`}
              />
            </div>
            {showErrors && errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Label className="text-base">
            Visibility <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={values.visibility}
            onValueChange={(value) => setFieldValue("visibility", value)}
            className={`space-y-3 ${
              showErrors && errors.visibility
                ? "border-red-500 border p-3 rounded-md"
                : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={DraftStatus.DRAFT} id="draft" />
              <Label htmlFor="draft" className="font-normal">
                Draft - Only visible to you
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={DraftStatus.PUBLISHED} id="published" />
              <Label htmlFor="published" className="font-normal">
                Published - Visible to everyone
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={DraftStatus.ARCHIVED} id="archived" />
              <Label htmlFor="archived" className="font-normal">
                Archived - Visible to everyone
              </Label>
            </div>
          </RadioGroup>
          {showErrors && errors.visibility && (
            <p className="text-red-500 text-sm mt-1">{errors.visibility}</p>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          type="button"
          onClick={onContinue}
          className="flex items-center gap-2"
        >
          Preview
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
