import Users, { Average, Grade, User } from "../models/userModel.js";


export const AllUsers = async (): Promise<User[] | void> => {
        const allUsers: User[]| null = await Users.find();
        if (allUsers) {
            return allUsers
        }else throw Error
}

export const allGradsUsers = async (): Promise<Average[] | void>=>{
    const allUsers: User[] = await Users.find();
    const allGrads:Average[] = []
    if (allUsers) {
        allUsers.forEach(user => {
            const userGrads:Average = {
                name: user.fullName,
                grads:user.grades!
            }
            allGrads.push(userGrads);
        });
        return allGrads;
    }else throw Error
}

export const allGradsAverageUsers = async (): Promise<Average[] | void>=>{
    const allUsers: User[] = await Users.find();
    const allGrads:Average[] = []
    if (allUsers) {
        allUsers.forEach(user => {
            const userGrads:Average = {
                name: user.fullName,
                average: GetAverageUser(user)
            }
            allGrads.push(userGrads);
        });
        return allGrads;
    }else throw Error
}

export const AddGradToStudent = async (id:string, grad:Grade): Promise<void>=>{
    const student:User | null = await Users.findOne({_id: id})
    if (student) {
        student.grades?.push(grad)
    } else throw Error
}

export const RemoveGradStudent = async ( id: string, subject: string): Promise<User> => {
  const student: User | null = await Users.findByIdAndUpdate(
    id,
    { $pull: { grads: { subject: subject } } },
    { new: true }
  );
  if (student) {
    return student;
  } else throw Error;
};

export const EditGradStudent = async ( id: string, grad: Grade): Promise<User> => {
    const student: User | null = await Users.findByIdAndUpdate(
      { _id: id, "grads.subject": grad.subject }, 
      { $set : { grads: grad } },
      { new: true }
    );
    if (student) {
      return student;
    } else throw Error;
};

export const findUserGrade = async (id:string): Promise<Grade[]>=>{
  const student: User | null = await Users.findOne({ _id: id });
  if (student?.grades) {
    return student.grades;
  } else throw Error;
}

export const findUserAverageGrade = async (id:string): Promise<Average>=>{
    const student: User | null = await Users.findOne({ _id: id });
    if (student) {
        const userGrads:Average = {
            name: student.fullName,
            average: GetAverageUser(student)
        }
        return userGrads
    } else throw Error;
}

export const RemoveStudent = async ( id: string): Promise<User> => {
    const student: User | null = await Users.findByIdAndDelete(id, {role:{$ne : 'teacher'}});
    if (student) {
      return student;
    } else throw Error;
};
  
const GetAverageUser = (user:User): number =>{
    if (user.grades) {
        let sum: number = 0
        user.grades.forEach(grad => {
            sum += grad.grade
        });
        return sum / user.grades.length
    } else throw Error
} 