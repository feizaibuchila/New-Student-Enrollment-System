export interface UserInfo {
  openid: string;
  role: 'student' | 'volunteer';
  nickname: string;
  avatar: string;
  gender: string;
  enrollmentYear: number | null;
}

export interface ContentDisplay {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  author: string;
  role: 'student' | 'volunteer';
}
