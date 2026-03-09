import bear from '../assets/avatars/bear.png';
import boy from '../assets/avatars/boy.png';
import boy1 from '../assets/avatars/boy1.png';
import boy2 from '../assets/avatars/boy2.png';
import cat from '../assets/avatars/cat.png';
import dog from '../assets/avatars/dog.png';
import gamer from '../assets/avatars/gamer.png';
import giraffe from '../assets/avatars/giraffe.png';
import gorilla from '../assets/avatars/gorilla.png';
import lion from '../assets/avatars/lion.png';
import man from '../assets/avatars/man.png';
import man2 from '../assets/avatars/man2.png';
import panda from '../assets/avatars/panda.png';
import penguin from '../assets/avatars/penguin.png';
import rabbit from '../assets/avatars/rabbit.png';
import user from '../assets/avatars/user.png';
import users from '../assets/avatars/users.png';
import woman from '../assets/avatars/woman.png';
import woman1 from '../assets/avatars/woman1.png';
import woman2 from '../assets/avatars/woman2.png';

const avatarMap: Record<string, string> = {
    bear, boy, boy1, boy2, cat, dog, gamer, giraffe, gorilla, lion, man, man2, panda, penguin, rabbit, user, users, woman, woman1, woman2
};

export const getAvatar = (avatarName?: string): string => {
    if (!avatarName) return user;
    return avatarMap[avatarName] ?? user;
};