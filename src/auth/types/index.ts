export type JwtPayload = {
  iat?: Date;
  exp?: Date;
  id: number;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};
