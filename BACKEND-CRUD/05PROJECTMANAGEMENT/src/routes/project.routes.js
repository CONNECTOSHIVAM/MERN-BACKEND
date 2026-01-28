import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { getProjects, getProjectById, createProject, updateProjects, deleteProjects, addMembersToProjects, getProjectMember, updateMemberRole, deleteMember } from "../controllers/project.controllers.js";
import { createProjectValidator, addMembersToProjectValidator  } from "../validators/index.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT)

router
    .route("/")
    .get(getProjects)
    .post(createProjectValidator(), validate, createProject)

router
    .route("/:projectId")
    .get(validateProjectPermission(AvailableUserRole), getProjectById)
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createProjectValidator(),
        validate,
        updateProjects()
    )
    .delete(
        validateProjectPermission([UserRolesEnum.ADMIN ]),
        deleteProjects
    )

export default router;