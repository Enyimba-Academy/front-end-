import { Download, Linkedin, Share2, Twitter } from "lucide-react";
import PrimaryLink from "../components/shared/PrimaryLink";
import PrimaryButton from "../components/shared/PrimaryButton";
export default function CertificatePage() {
  return (
    <div className="  px-[150px]">
      {/* Certificate Container with Blue Border */}
      <div className="p-4 md:p-8">
        {/* Certificate */}
        <div className="bg-white border border-gray-200 rounded-md p-8">
          <div className="text-center space-y-4">
            <p className="text-gray-700">This is to certify that</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Sarah Johnson
            </h1>
            <p className="text-gray-700">has successfully completed the</p>
            <p className="text-xl md:text-2xl font-semibold text-red-600">
              Professional Certificate in Photography
            </p>
            <p className="text-gray-700">at Enyinna Art School</p>
            <p className="text-gray-700">on April 15, 2025</p>

            <div className="pt-12 max-w-xs mx-auto">
              <div className="border-t border-gray-300 pt-2">
                <p className="text-sm text-gray-600">Director of Studies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 py-8">
          <PrimaryButton className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
            <Download size={18} />
            <span>Download PDF</span>
          </PrimaryButton>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
            <Linkedin size={18} />
            <span>Add to LinkedIn</span>
          </button>
        </div>

        {/* Share Options */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-gray-600">Share:</span>
          <button className="text-gray-600 hover:text-blue-600">
            <Linkedin size={20} />
          </button>
          <button className="text-gray-600 hover:text-blue-400">
            <Twitter size={20} />
          </button>
          <button className="text-gray-600 hover:text-green-600">
            <Share2 size={20} />
          </button>
        </div>

        {/* Continue Learning Section */}
        <div className="py-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Continue Your Learning Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course 1 */}
            <div className="border border-gray-200 rounded-md p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Professional Diploma in Cinematography
              </h3>
              <p className="text-gray-600 mb-4">
                Take your skills to the next level with our 6-month program
              </p>
              <PrimaryLink href="/courses/photography-course">
                Learn More
              </PrimaryLink>
            </div>

            {/* Course 2 */}
            <div className="border border-gray-200 rounded-md p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Photo Editing Mastery
              </h3>
              <p className="text-gray-600 mb-4">
                Master professional photo editing techniques
              </p>
              <PrimaryLink href="/courses/photography-course">
                Learn More
              </PrimaryLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
