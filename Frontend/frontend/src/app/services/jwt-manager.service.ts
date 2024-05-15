import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { JwtInfo, Tokens } from '../interfaces/Tokens';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtManagerService {
  tokens: Tokens | null = null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() { }

  saveTokens(jwt: string, refreshToken: string, refreshTokenExpiration: string) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('refreshTokenExpiration', refreshTokenExpiration);

    this.tokens = {
      jwtInfo: this.getJwtInfo(jwt),
      jwt: jwt,
      refreshToken: refreshToken,
      refreshTokenExpiresAt: refreshTokenExpiration
    };

    this.isLoggedInSubject.next(true);
  }

  removeTokens() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpiration');

    this.tokens = null;

    this.isLoggedInSubject.next(false);
  }

  getTokens(): Tokens | null {
    if(this.tokens){
      return this.tokens;
    }

    let jwt = localStorage.getItem('jwt');
    let refreshToken = localStorage.getItem('refreshToken');
    let refreshTokenExpiration = localStorage.getItem('refreshTokenExpiration');

    if (jwt && refreshToken && refreshTokenExpiration) {
      return {
        jwtInfo: this.getJwtInfo(jwt),
        jwt: jwt,
        refreshToken: refreshToken,
        refreshTokenExpiresAt: refreshTokenExpiration
      };
    } else {
      return null;
    }
  }

  private getJwtInfo(jwt: string): JwtInfo | null {
    try {
      let decodedToken: any = jwtDecode(jwt);
      return {
        id: decodedToken.id,
        firstName: decodedToken.firstName,
        email: decodedToken.email,
        roleId: decodedToken.roleId,
        role: decodedToken.role,
        exp: decodedToken.exp
      };
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  async validTokens(tokens: Tokens): Promise<boolean> {
    if (tokens.jwtInfo) {
      if (tokens.jwtInfo.exp * 1000 > Date.now()) {
        this.isLoggedInSubject.next(true);
        return true;
      } else {
        return await this.validRefreshToken(tokens);
      }
    }
    return false;
  }
}
