import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/review";
import ReviewCard from "../components/ReviewCard";

const StartPage = () => {
	const { fetchReviews, reviews } = useProductStore();

	useEffect(() => {
		fetchReviews();
	}, [fetchReviews]);
	console.log("reviews", reviews);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, yellow.600, orange.700)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Welcome to a Community of Caffeine Lovers in Davis!
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{reviews.map((review) => (
						<ReviewCard key={review._id} review={review} />
					))}
				</SimpleGrid>

				{reviews.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No reviews found |{" "}
						<Link to={"/create"}>
							<Text as='span' color='orange.900' _hover={{ textDecoration: "underline" }}>
								Create a review
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default StartPage;