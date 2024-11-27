import React, {useState} from 'react';

import {CircularProgress, styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Badge} from '../badge';
import {Icon2} from '../icon';

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
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
	flex-direction: column;
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

// Component
export const DrugAndDrop: React.FC = () => {
	const [files, setFiles] = useState<FileData[]>([]);
	const [isOnDrugOver, setIsOnDrugOver] = useState(false);

	const uploadFile = async (fileData: FileData, index: number) => {
		try {
			setFiles((prev) => prev.map((f, i) => (i === index ? {...f, uploading: true} : f)));
			// Пример асинхронного запроса на сервер
			const formData = new FormData();
			formData.append('file', fileData.file);

			await new Promise((resolve) => setTimeout(resolve, 2000)); // Заменить на реальный запрос, например fetch или axios

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

		for (let index = 0; index < selectedFiles.length; index++) {
			const file = selectedFiles[index];
			await uploadFile(file, files.length + index);
		}
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

		for (let index = 0; index < droppedFiles.length; index++) {
			const file = droppedFiles[index];
			await uploadFile(file, files.length + index);
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		setIsOnDrugOver(true);
		event.preventDefault();
	};

	const handleRemoveFile = (index: number) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	// const startUpload = (file: FileData, index: number) => {
	// 	const interval = setInterval(() => {
	// 		setFiles((prevFiles) =>
	// 			prevFiles.map((f, i) =>
	// 				i === index
	// 					? {
	// 							...f,
	// 							progress: Math.min(f.progress + 10, 100),
	// 						}
	// 					: f,
	// 			),
	// 		);
	// 		if (file.progress === 100) clearInterval(interval);
	// 	}, 300);
	// };

	return (
		<Container>
			{/* Drop area */}
			<DropArea
				className={isOnDrugOver ? 'onDrugOver' : ''}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragEnter={() => setIsOnDrugOver(true)}
				onDragLeave={() => setIsOnDrugOver(false)}
				onDragEnd={() => setIsOnDrugOver(false)}
				onDragExit={() => setIsOnDrugOver(false)}
				onClick={() => document.getElementById('fileInput')?.click()}
			>
				<p>
					<span style={{color: 'rgba(46, 172, 251, 1)'}}>Прикрепите документ</span> или перетащите файл сюда
				</p>
				<FileInput id="fileInput" type="file" multiple onChange={handleFileSelect} />
			</DropArea>

			{/* File list */}
			<FileList>
				{files.map((file, index) => {
					console.log(file.progress);

					return (
						<Badge
							color="rgba(35, 31, 35, 1)"
							backgroundColor="rgba(245, 245, 245, 1)"
							key={index}
							label={file.name}
							leftIcon={
								file.progress === 100 ? (
									<Icon2 size={20} url={getIconUrlByName('fileIcon')} />
								) : (
									<CircularProgress size={16} variant="indeterminate" />
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
};
