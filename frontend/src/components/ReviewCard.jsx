import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/review";
import { useState } from "react";

const ReviewCard = ({ review }) => {
	const [updatedReview, setUpdatedReview] = useState(review);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteReview, updateReview } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteReview = async (pid) => {
		const { success, message } = await deleteReview(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateReview = async (pid, updatedReview) => {
		const { success, message } = await updateReview(pid, updatedReview);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Review updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={review.image} alt={review.title} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{review.title}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{review.drink}
				</Text>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{review.rating}
				</Text>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{review.price}
				</Text>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{review.location}
				</Text>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{review.review}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteReview(review._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Review</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
							placeholder='Review Title'
							name='title'
							value={updatedReview.title}
							onChange={(e) => setUpdatedReview({ ...updatedReview, title: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={updatedReview.image}
							onChange={(e) => setUpdatedReview({ ...updatedReview, image: e.target.value })}
						/>
						<Input
							placeholder='Drink'
							name='drink'
							value={updatedReview.drink}
							onChange={(e) => setUpdatedReview({ ...updatedReview, drink: e.target.value })}
						/>
						<Input
							placeholder='Rating'
							name='rating'
							type='number'
							value={updatedReview.rating}
							onChange={(e) => setUpdatedReview({ ...updatedReview, rating: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={updatedReview.price}
							onChange={(e) => setUpdatedReview({ ...updatedReview, price: e.target.value })}
						/>
						<Input
							placeholder='Location'
							name='location'
							value={updatedReview.location}
							onChange={(e) => setUpdatedReview({ ...updatedReview, location: e.target.value })}
						/>
						<Input
							placeholder='Review'
							name='review'
							value={updatedReview.review}
							onChange={(e) => setUpdatedReview({ ...updatedReview, review: e.target.value })}
						/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateReview(review._id, updatedReview)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ReviewCard;