import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award, Calendar, User, X } from "lucide-react";
import html2canvas from "html2canvas";

export default function Certificate({
  recipientName = "John Doe",
  courseName = "Broadcasting Excellence Program",
  completionDate = "December 2024",
  instructorName = "Dr. Sarah Johnson",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const certificateRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        setDownloading(true);
        const canvas = await html2canvas(certificateRef.current, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          onclone: (clonedDoc) => {
            const elementsToRemove = clonedDoc.querySelectorAll(
              ".remove-from-export"
            );
            elementsToRemove.forEach((el) => el.remove());
          },
        });
        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = `${recipientName.replace(
              /\s+/g,
              "_"
            )}_Certificate.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            setDownloading(false);
          },
          "image/png",
          1.0
        );
      } catch (error) {
        setDownloading(false);
        console.error("Error generating certificate:", error);
      }
    }
  };

  // Custom modal close handler
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Certificate Card */}
      <Card
        className="w-full max-w-md mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 border-red-800"
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-800 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Certificate of Completion
              </h3>
              <p className="text-gray-600 text-sm">
                Enyimba TV & Radio Academy
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                <span>{recipientName}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{completionDate}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Click to view full certificate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Custom Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fadeIn overflow-auto"
          onClick={handleOverlayClick}
          style={{ overscrollBehavior: "contain" }}
        >
          {/* Top right controls */}
          <div className="absolute top-6 right-8 flex gap-3">
            <button
              onClick={downloadCertificate}
              className="bg-white rounded-full p-2 shadow hover:bg-red-100 transition-colors border border-red-200"
              title="Download Certificate"
              disabled={downloading}
            >
              <Download className="w-6 h-6 text-red-800" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white rounded-full p-2 shadow hover:bg-red-100 transition-colors border border-red-200"
              title="Close"
            >
              <X className="w-6 h-6 text-red-800" />
            </button>
          </div>

          {/* Centered Certificate */}
          <div className="w-full flex flex-col items-center justify-center px-2 md:px-8 py-12">
            <div
              ref={certificateRef}
              className="bg-white border-8 border-red-800 relative mx-auto flex flex-col justify-center items-center shadow-xl"
              style={{
                backgroundColor: "#fff", // Force white background for html2canvas
                aspectRatio: "11/8.5",
                width: "90vw",
                maxWidth: "1100px",
                height: "auto",
                minHeight: "400px",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-red-600"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-red-600"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-red-600"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-red-600"></div>

              <div className="text-center space-y-4 md:space-y-6 h-full flex flex-col justify-center px-4 md:px-12 py-4 md:py-8 w-full">
                {/* Header */}
                <div className="space-y-2">
                  <img
                    src="/logo.png"
                    alt="Enyimba TV & Radio Academy Logo"
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto object-contain"
                    style={{ marginTop: "-2.5rem" }}
                  />
                  <h1 className="text-2xl md:text-4xl font-bold text-red-800 tracking-wide">
                    ENYIMBA TV & RADIO ACADEMY
                  </h1>
                  <div className="w-24 md:w-32 h-1 bg-red-600 mx-auto"></div>
                </div>

                {/* Certificate Title */}
                <div className="space-y-2 md:space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif text-gray-800">
                    Certificate of Completion
                  </h2>
                  <p className="text-base md:text-lg text-gray-600">
                    This is to certify that
                  </p>
                </div>

                {/* Recipient Name */}
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-4xl font-bold text-red-800 border-b-2 border-red-200 pb-2 inline-block">
                    {recipientName}
                  </h3>
                </div>

                {/* Course Details */}
                <div className="space-y-2 md:space-y-3 text-gray-700">
                  <p className="text-base md:text-lg">
                    has successfully completed the
                  </p>
                  <h4 className="text-xl md:text-2xl font-semibold text-red-700">
                    {courseName}
                  </h4>
                  <p className="text-base md:text-lg">
                    and has demonstrated proficiency in broadcasting excellence
                  </p>
                </div>

                {/* Date and Signatures */}
                <div className="flex justify-between items-end mt-4 md:mt-8 pt-4 md:pt-8 w-full">
                  <div className="text-center">
                    <div className="w-24 md:w-32 h-0.5 bg-gray-400 mb-2"></div>
                    <p className="text-xs md:text-sm text-gray-600">Date</p>
                    <p className="text-sm md:text-base font-semibold">
                      {completionDate}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-32 md:w-40 h-12 md:h-16 bg-red-50 border-2 border-red-200 rounded-lg flex items-center justify-center mb-2">
                      <Award className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Official Seal
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-24 md:w-32 h-0.5 bg-gray-400 mb-2"></div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Instructor
                    </p>
                    <p className="text-sm md:text-base font-semibold">
                      {instructorName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
