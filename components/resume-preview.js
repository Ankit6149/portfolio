"use client";

import Image from "next/image";

export function ResumeToolbar({ resume }) {
  return (
    <div className="resume-toolbar" aria-label="Resume download actions">
      <a
        className="button button-solid"
        href={resume.files.pdf}
        download
      >
        Download PDF
      </a>
      <a
        className="button"
        href={resume.files.docx}
        download
      >
        Download DOCX
      </a>
    </div>
  );
}

export function ResumePreview({ resume }) {
  return (
    <Image
      className="resume-preview-image"
      src={resume.files.preview}
      alt="Resume preview"
      width={595}
      height={842}
      priority
      unoptimized
    />
  );
}
