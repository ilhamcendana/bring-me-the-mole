import { ReactNode } from "react";

// Global Components
import Modal from "@/components/actions/Modal/Modal";

interface IModalResult {
  isOpen: boolean;
  title: string;
  description?: string;
  ctas?: ReactNode[];
}

export default function ModalResult({
  isOpen,
  title,
  description,
  ctas,
}: IModalResult) {
  return (
    <Modal isOpen={isOpen}>
      <div className="mb-8 flex flex-col gap-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </div>
      <div className="flex gap-4 justify-center">{ctas?.map((x) => x)}</div>
    </Modal>
  );
}
