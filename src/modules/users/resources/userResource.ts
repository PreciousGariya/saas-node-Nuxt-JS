const userResource = (user) => {
    return {
        "id": user.id,
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "phone": user.phone,
        "stripeCustomerId": user.stripeCustomerId,
        "emailVerified": user.emailVerified,
        "subscriptionStatus": user.subscriptionStatus,
        "role": user.role,
        "isActive": user.isActive,
        "createdAt": user.createdAt,
    }
}

export {userResource}