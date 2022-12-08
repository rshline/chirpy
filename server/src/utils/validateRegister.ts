import { RegisterInput } from "../resolvers/inputs/RegisterInput";

export const validateRegister = (options: RegisterInput) => {
  
      if (options.name.length <= 2) {
        return  [
            {
              field: "name",
              message: "length must be greater than 2",
            },
        ]
      }
      
      if (!options.email.includes('@')) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ]
      }
  
      if (options.username.length <= 2) {
        return  [
            {
              field: "username",
              message: "length must be greater than 2",
            },
        ]
      }

      if (options.username.includes('@')) {
        return [
            {
              field: "username",
              message: "cannot include an @",
            },
        ]
      }
  
      if (options.password.length <= 2) {
        return [
            {
              field: "password",
              message: "length must be greater than 2",
            },
        ]
      }

    return null
  
}