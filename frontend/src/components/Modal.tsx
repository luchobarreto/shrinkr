import React, { Fragment } from "react";

import { GrClose } from "react-icons/gr";

import styles from "./Modal.module.css";

interface Button {
	background?: string;
	color?: string;
	text: string;
	onClick?: any;
	closeModal?: boolean;
	border?: string;
}

interface props {
	isOpen: boolean;
	onClose?: any;
	toggleOpen: any;
	title?: string;
	buttons?: Array<Button>;
	children?: any;
	className?: string;
}

const Modal: React.FC<props> = ({
	isOpen,
	toggleOpen,
	title,
	buttons,
	onClose,
	className,
	children,
}) => {
	return (
		<Fragment>
			<div className={styles.shrModalContainer} style={{ display: isOpen ? "flex" : "none" }}>
				<div className={styles.shrModal}>
					<div
						className={styles.shrModalClose}
						onClick={() => {
							onClose();
							toggleOpen();
						}}
					>
						<GrClose />
					</div>
					{title && (
						<div className={styles.shrModalHeader}>
							<h2>{title}</h2>
						</div>
					)}
					<div className={`${styles.shrModalBody} ${className}`}>{children}</div>
					<div className={styles.shrModalFooter}>
						{buttons?.map((button: Button) => (
							<button
								onClick={() => {
									if (button.closeModal) toggleOpen();
									if (button.onClick) button.onClick();
								}}
								className={styles.shrModalButton}
								style={{
									color: button.color,
									background: button.background,
									border: `${button.border} 1px solid`,
								}}
							>
								{button.text}
							</button>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default React.memo(Modal);
