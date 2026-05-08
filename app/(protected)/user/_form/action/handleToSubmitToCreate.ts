'use server';

import { fail, ok } from '@/lib/util/reponseUtil';
import { User, UserResponse } from '../../../../../lib/generated/api/customHookAPI/graphql';
import { ActionType } from '@/app/_component/Row/Action';
import { client } from '@/app/_context/GraphQLClient/client';
import { UserCreate, UserUpdate } from '@/lib/api/gql/User.gql';
import { hashPassword } from '@/lib/util/bcryptjs';
import { generateEmployeeNumberForWork } from '@/lib/util/generateOtpCode';



const buildBasicInformationsPayload = async (basicInfo: User['basicInformations']) => {
  return {
    firstName: basicInfo?.firstName,
    middleName: basicInfo?.middleName,
    lastName: basicInfo?.lastName,
    suffix: basicInfo?.suffix,
    fullName: basicInfo?.fullName,
    birthDate: basicInfo?.birthDate ? new Date(basicInfo.birthDate) : null,
    gender: basicInfo?.gender,
    workInformations: {
      create: await Promise.all(
        basicInfo?.workInformations.map(async (workinfo) => ({
          employeeNumber: workinfo.employeeNumber ? workinfo.employeeNumber : await generateEmployeeNumberForWork(),
          groupOfCompanyId: workinfo.groupOfCompanyId ? workinfo.groupOfCompanyId : null,
          companyId: workinfo.companyId ? workinfo.companyId : null,
          departmentId: workinfo.departmentId ?? null,
          positionId: workinfo.positionId ? workinfo.positionId : null,
          jobLevelId: workinfo.jobLevelId ? workinfo.jobLevelId : null,
          employmentTypeId: workinfo.employmentTypeId ? workinfo.employmentTypeId : null,
          employmentStatusId: workinfo.employmentStatusId ? workinfo.employmentStatusId : null,
          reportingManagerId: workinfo.reportingManagerId ? workinfo.reportingManagerId : null,
        })) ?? []
      )
    }
  };
};

const buildUserData = async (modelData: User, isEdit: boolean) => {
  return {
    name: modelData.name,
    email: modelData.email,
    ...(!isEdit && { password: modelData.password ? await hashPassword(modelData.password) : null }),
    userName: modelData.userName,
    emailVerified: modelData.emailVerified ? new Date(modelData.emailVerified) : null,
    image: modelData.image,
    isTwoFactorAuthEnabled: true,
    userRoles: {
      ...(isEdit && { deleteMany: {}, }),
      create: modelData.userRoles.map(role => ({
        roleId: role.roleId ? role.roleId : null
      })),
    },
    basicInformations: {
      ...(isEdit && { delete: true }),
      create: await buildBasicInformationsPayload(modelData.basicInformations)
    }
  };
};

const handleToSubmitToCreate = async (
  data: unknown,
  actionType: ActionType,
  currentUserId: string,
  id: string
) => {
  try {
    const modelData = data as unknown as User;

    // Validate required fields
    if (!modelData.email || !modelData.userName || !modelData.password) {
      return fail("VALIDATION_ERROR", "Email, username, and password are required fields.");
    }

    const isEdit = actionType === 'edit';
    const mutation = isEdit ? UserUpdate : UserCreate;
    const userData = await buildUserData(modelData, isEdit);
    console.log(actionType === 'edit' ? "Updating user with data:" : "Creating user with data:", JSON.stringify(userData, null, 2));

    const mutate = await client.mutate({
      mutation,
      variables: {
        currentUserId: currentUserId ?? null,
        data: userData,
        ...(isEdit && { id })
      }
    });

    const resultKey = isEdit ? 'UserUpdate' : 'UserCreate';
    const result = (mutate.data as Record<string, UserResponse>)?.[resultKey];


    const messages: Record<string, { code: string; text: string }> = {
      edit: { code: result?.code || 'SUCCESS', text: "updated" },
      view: { code: result?.code || 'SUCCESS', text: "viewed" },
      duplicate: { code: result?.code || 'SUCCESS', text: "duplicated" },
      create: { code: result?.code || 'SUCCESS', text: "created" }
    };

    if (!result?.isSuccess) {
      return fail(
        result?.code || "ERROR",
        result?.message || "An error occurred while processing the request."
      );
    }

    const message = messages[actionType] || messages.create;
    return ok(
      message.code,
      `Successfully ${message.text} user: ${modelData.name}`,
      result.data
    );
  } catch (error) {
    return fail(
      "SERVER_ERROR",
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export default handleToSubmitToCreate;