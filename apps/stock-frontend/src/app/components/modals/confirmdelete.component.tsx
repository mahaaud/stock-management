import { Button, Modal, Typography  } from "antd";

const { Text, Paragraph } = Typography;

export function ConfirmDeleteModal({ isOpen, onConfirmHandle, onCancelHandle, itemName }: any): any {

    const titleText = `Confirm to delete this item '${itemName}'?`;
    return (
        <Modal
            open={isOpen}
            title={titleText}
            onCancel={onCancelHandle}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <Button type="primary" onClick={onConfirmHandle} danger>Confirm</Button>
              </>
            )}
          >
            <Paragraph><Text>This action cannot be undone.</Text></Paragraph>
          </Modal>
    );
}