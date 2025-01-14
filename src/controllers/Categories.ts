import { FastifyRequest, FastifyReply } from "fastify";
import { ServerResponse } from "http";

import services from "../services";

class Categories {
	async routeCategoriesPost(
		req: FastifyRequest,
		res: FastifyReply<ServerResponse>,
	): Promise<void> {
		// @ts-ignore
		if (!req.body || req.validationError) {
			res.status(400).send({
				ok: "false",
				error: "InvalidRequest",
			});
		} else {
			try {
				// Call Use-Case
				await services.CategoriesService.createCategory({
					id: req.body.id,
					name: req.body.name,
					childrenIds: req.body.childrenIds,
				});

				// Send Success
				res.status(200).send({
					ok: true,
				});
			} catch (err) {
				// Notify Error
				res.status(500).send({
					ok: false,
					error: err.message,
				});
			}
		}
	}

	async routeCategoriesGetAll(
		req: FastifyRequest,
		res: FastifyReply<ServerResponse>,
	): Promise<void> {
		// @ts-ignore
		if (req.validationError) {
			res.status(400).send({
				ok: "false",
				error: "InvalidRequest",
			});
		} else {
			// Try Fetch Data
			try {
				// Get Optional Parameters
				const offset = parseInt(req.query.offset);
				const limit = parseInt(req.query.limit);
				// Fetch Data
				const fetchedCategories = await services.CategoriesService.fetchCategories(
					offset,
					limit,
				);
				// Send Success
				res.status(200).send(fetchedCategories);
			} catch (err) {
				// Notify Error
				res.status(500).send({
					ok: false,
					error: err.message,
				});
			}
		}
	}

	async routeCategoriesGetById(
		req: FastifyRequest,
		res: FastifyReply<ServerResponse>,
	): Promise<void> {
		// @ts-ignore
		if (req.validationError) {
			res.status(400).send({
				ok: "false",
				error: "InvalidRequest",
			});
		} else {
			// Try Fetch Data
			try {
				// Get ID to find
				const idToFind = parseInt(req.params.id);
				// Fetch Data
				const fetchedCategorie = await services.CategoriesService.fetchCategoryById(
					idToFind,
				);
				// Send Success
				res.status(200).send(fetchedCategorie);
			} catch (err) {
				// Notify Error
				res.status(500).send({
					ok: false,
					error: err.message,
				});
			}
		}
	}
}

export default new Categories();
