import { create } from "zustand";

export const useProductStore = create((set) => ({
	reviews: [],
	setReviews: (reviews) => set({ reviews }),
	createReview: async (newReview) => {
		if (!newReview.title || !newReview.image || !newReview.drink || !newReview.rating || !newReview.price || !newReview.location || !newReview.review) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/reviews", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newReview),
		});
		const data = await res.json();
		set((state) => ({ reviews: [...state.reviews, data.data] }));
		return { success: true, message: "Review created successfully" };
	},
	fetchReviews: async () => {
		const res = await fetch("/api/reviews");
		const data = await res.json();
		set({ reviews: data.data });
	},
	deleteReview: async (pid) => {
		const res = await fetch(`/api/reviews/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ reviews: state.reviews.filter((review) => review._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateReview: async (pid, updatedReview) => {
		const res = await fetch(`/api/reviews/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedReview),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			reviews: state.reviews.map((review) => (review._id === pid ? data.data : review)),
		}));

		return { success: true, message: data.message };
	},
}));