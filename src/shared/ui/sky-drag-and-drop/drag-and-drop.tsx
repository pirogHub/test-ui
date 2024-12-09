import React, {forwardRef, useRef, useState} from 'react';

import {CircularProgress, styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Badge} from '../badge/badge';
import {Icon2} from '../icon/icon';

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
	/* padding: 20px; */
`;

const DropArea = styled('div')`
	flex: 1;
	border: 2px dashed #ccc;
	border-radius: 10px;
	padding: 20px;
	text-align: center;
	color: rgba(27, 31, 59, 0.4);
	cursor: pointer;
	transition: all 0.4s ease;
	font-weight: 600;

	&:hover,
	&.onDrugOver {
		border-color: rgba(46, 172, 251, 1);
		/* color: #007bff; */
	}

	&.onDrugOver {
		background-color: rgba(46, 172, 251, 0.15);
		border-style: solid;
		border-width: 2px;
	}
`;

const FileList = styled('div')`
	flex: 1;
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

const FileInput = styled('input')`
	display: none;
`;

const Button = styled('button')`
	margin-top: 10px;
	padding: 8px 15px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
`;

interface FileData {
	file: File;
	name: string;
	progress: number;
}
interface DragAndDropProps {
	value: File[] | undefined;
	onChange: (files: File[]) => void;
	onBlur?: () => void;
	error?: string;
}
export const DragAndDrop = forwardRef<HTMLInputElement, DragAndDropProps>(
	({value, onChange, onBlur, error}, inputRef) => {
		const [files, setFiles] = useState<FileData[]>([]);
		const [isOnDrugOver, setIsOnDrugOver] = useState(false);

		const uploadFile = async (fileData: FileData, index: number) => {
			try {
				setFiles((prev) => prev.map((f, i) => (i === index ? {...f, uploading: true} : f)));
				const formData = new FormData();
				formData.append('file', fileData.file);

				await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 2000)); // Заменить на реальный запрос, например fetch или axios

				setFiles((prev) =>
					prev.map((f, i) =>
						i === index
							? {
									...f,
									progress: 100,
									uploading: false,
								}
							: f,
					),
				);
				const uploadedFiles = files.filter((f) => f.progress === 100).map((f) => f.file);
				onChange([...uploadedFiles, fileData.file]);
			} catch (error) {
				console.error(`Error uploading file ${fileData.name}`, error);
				// Обработка ошибок
				setFiles((prev) => prev.map((f, i) => (i === index ? {...f, uploading: false} : f)));
			}
		};

		const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFiles = Array.from(event.target.files || []).map((file) => ({
				file,
				name: file.name,
				progress: 0,
			}));
			setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

			await Promise.all(selectedFiles.map((file, index) => uploadFile(file, files.length + index)));
			// if (onBlur) onBlur();
		};

		const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			setIsOnDrugOver(false);
			const droppedFiles = Array.from(event.dataTransfer.files).map((file) => ({
				file,
				name: file.name,
				progress: 0,
			}));
			setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);

			await Promise.all(droppedFiles.map((file, index) => uploadFile(file, files.length + index)));
			// if (onBlur) onBlur();
		};

		const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			setIsOnDrugOver(true);
		};

		const handleRemoveFile = (index: number) => {
			const updatedFiles = files.filter((_, i) => i !== index);
			setFiles(updatedFiles);
			const uploadedFiles = updatedFiles.filter((f) => f.progress === 100).map((f) => f.file);
			onChange(uploadedFiles);
			// setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
		};

		const dragTimer = useRef<NodeJS.Timeout | null>(null);

		const toggleDragStyle = (isOver: boolean) => {
			if (dragTimer.current) {
				clearTimeout(dragTimer.current);
			}
			dragTimer.current = setTimeout(() => {
				setIsOnDrugOver(isOver);
			}, 200);
		};

		return (
			<Container>
				{/* Drop area */}
				<DropArea
					className={isOnDrugOver ? 'onDrugOver' : ''}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragEnter={() => {
						toggleDragStyle(true);
					}}
					onDragLeave={() => {
						toggleDragStyle(false);
					}}
					// onDragEnd={() => setIsOnDrugOver(false)}
					onDragExit={() => setIsOnDrugOver(false)}
					onClick={() => document.getElementById('fileInput')?.click()}
				>
					<p>
						<span style={{color: 'rgba(46, 172, 251, 1)'}}>Прикрепите документ</span> или перетащите файл
						сюда
					</p>
					<FileInput ref={inputRef} id="fileInput" type="file" multiple onChange={handleFileSelect} />
				</DropArea>

				{/* File list */}
				<FileList>
					{files.map((file, index) => {
						return (
							<Badge
								color="text1"
								backgroundColor="base7"
								key={index}
								label={file.name}
								leftIcon={
									file.progress === 100 ? (
										<Icon2 size={20} url={getIconUrlByName('fileIcon')} />
									) : (
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												width: '20px',
												height: '20px',
											}}
										>
											<CircularProgress size={16} variant="indeterminate" />
										</div>
									)
								}
								rightComponent={
									<Icon2
										size={20}
										sx={{cursor: 'pointer'}}
										url={getIconUrlByName('chest')}
										onClick={() => handleRemoveFile(index)}
									/>
								}
							/>
						);
					})}
					{/* {files.length > 0 && <Button onClick={() => files.forEach(startUpload)}>Upload All</Button>} */}
				</FileList>
			</Container>
		);
	},
);

DragAndDrop.displayName = 'DragAndDrop';
