"use client";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Icons } from "../../components/ui/icons";
import { PasswordStrengthMeter } from "../../components/ui/password-strength-meter";
import toast from "react-hot-toast";
import * as snarkjs from "snarkjs";
import { generateProof } from "../../actions/auth";
import { login, register } from "../../actions/user/index";
import { useRouter } from "next/navigation";

export default function LoginSignup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const checkPasswordsMatch = () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      toast.error("Passwords do not match.");
    } else {
      setPasswordsMatch(true);
    }
  };

  async function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("You have successfully logged in.");
    }, 3000);
  }

  async function onConnectWallet() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      toast.success("Wallet Connected successfully.");
    }, 2000);
  }
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    checkPasswordsMatch();

    if (!passwordsMatch) {
      return;
    }

    const res = await register(email, password, name);
    console.log(res);
    if (res.success) {
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.user.id);
        localStorage.setItem("name", res.user.name);
        localStorage.setItem("email", res.user.email);  
      }
      toast.success("Registration successful.");
      router.push("/campaigns");
    } else {
      toast.error("Invalid proof.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(email, password);

    if (res.success) {
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.user.id);
        localStorage.setItem("name", res.user.name);
        localStorage.setItem("email", res.user.email);
        localStorage.setItem("token", res.token);
      }
      toast.success("Login successful.");
      router.push("/campaigns");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-md bg-gray-900 bg-opacity-80 border-gray-800">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-gray-900"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-gray-900"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardHeader>
              <CardTitle className="text-white">Login</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your email and password to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={onSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  type="submit"
                  disabled={isLoading}
                  onClick={handleLogin}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                className="px-0 text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </Button>
            </CardFooter>
          </TabsContent>
          <TabsContent value="register">
            <CardHeader>
              <CardTitle className="text-white">Create an account</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your email and create a password to register
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={onSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <PasswordStrengthMeter password={password} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-200">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  type="submit"
                  disabled={isLoading}
                  onClick={handleRegister}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create account
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
