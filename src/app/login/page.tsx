"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    emailCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Check auth status on mount
  useEffect(() => {
    if (wixClient.auth.loggedIn()) {
      router.push("/");
    }
  }, [wixClient, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email: formData.email,
            password: formData.password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email: formData.email,
            password: formData.password,
            profile: { nickname: formData.username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            formData.email,
            `${window.location.origin}/reset-password`
          );
          setMessage("Password reset email sent. Please check your inbox.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: formData.emailCode,
          });
          break;
      }

      if (!response) return;

      switch (response.loginState) {
        case LoginState.SUCCESS:
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          wixClient.auth.setTokens(tokens);
          setMessage("Login successful! Redirecting...");
          setTimeout(() => router.push("/"), 1500);
          break;

        case LoginState.FAILURE:
          handleLoginFailure(response.errorCode);
          break;

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          setMessage("Please check your email for verification code");
          break;

        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
          break;
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginFailure = (errorCode?: string) => {
    switch (errorCode) {
      case "invalidEmail":
      case "invalidPassword":
        setError("Invalid email or password");
        break;
      case "emailAlreadyExists":
        setError("Email already exists");
        break;
      case "resetPassword":
        setError("Password reset required");
        setMode(MODE.RESET_PASSWORD);
        break;
      default:
        setError("Authentication failed. Please try again.");
    }
  };

  const formTitle = {
    [MODE.LOGIN]: "Log In",
    [MODE.REGISTER]: "Create Account",
    [MODE.RESET_PASSWORD]: "Reset Password",
    [MODE.EMAIL_VERIFICATION]: "Verify Email",
  }[mode];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {formTitle}
        </h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === MODE.REGISTER && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lama-500 focus:border-transparent"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {mode !== MODE.EMAIL_VERIFICATION && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lama-500 focus:border-transparent"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {mode === MODE.EMAIL_VERIFICATION && (
            <div>
              <label
                htmlFor="emailCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Verification Code
              </label>
              <input
                id="emailCode"
                name="emailCode"
                type="text"
                placeholder="Enter verification code"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lama-500 focus:border-transparent"
                value={formData.emailCode}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lama-500 focus:border-transparent"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-lama-600 text-white py-2 px-4 rounded-md hover:bg-lama-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : formTitle}
          </button>

          <div className="text-center text-sm text-gray-600">
            {mode === MODE.LOGIN && (
              <>
                <span>Don't have an account? </span>
                <button
                  type="button"
                  className="text-lama-600 hover:underline"
                  onClick={() => setMode(MODE.REGISTER)}
                >
                  Sign up
                </button>
                <div className="mt-2">
                  <button
                    type="button"
                    className="text-lama-600 hover:underline"
                    onClick={() => setMode(MODE.RESET_PASSWORD)}
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            )}

            {mode === MODE.REGISTER && (
              <>
                <span>Already have an account? </span>
                <button
                  type="button"
                  className="text-lama-600 hover:underline"
                  onClick={() => setMode(MODE.LOGIN)}
                >
                  Log in
                </button>
              </>
            )}

            {mode === MODE.RESET_PASSWORD && (
              <button
                type="button"
                className="text-lama-600 hover:underline"
                onClick={() => setMode(MODE.LOGIN)}
              >
                Back to login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
