import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/review.js";

const CreatePage = () => {
	const [newReview, setNewReview] = useState({
		title: "",
		image: "",
		drink: "",
		rating: "",
		price: "",
		location: "",
		review: ""
	});
	const toast = useToast();

	const { createReview } = useProductStore();

	const handleAddReview = async () => {
		const { success, message } = await createReview(newReview);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewReview({ title: "", image: "", drink: "", rating: "", price: "", location: "", review: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Review
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Review Title'
							name='title'
							value={newReview.title}
							onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newReview.image}
							onChange={(e) => setNewReview({ ...newReview, image: e.target.value })}
						/>
						<Input
							placeholder='Drink'
							name='drink'
							value={newReview.drink}
							onChange={(e) => setNewReview({ ...newReview, drink: e.target.value })}
						/>
						<Input
							placeholder='Rating'
							name='rating'
							type='number'
							value={newReview.rating}
							onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newReview.price}
							onChange={(e) => setNewReview({ ...newReview, price: e.target.value })}
						/>
						<Input
							placeholder='Location'
							name='location'
							value={newReview.location}
							onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
						/>
						<Input
							placeholder='Review'
							name='review'
							value={newReview.review}
							onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
						/>

						<Button colorScheme='orange' onClick={handleAddReview} w='full'>
							Add Review
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;