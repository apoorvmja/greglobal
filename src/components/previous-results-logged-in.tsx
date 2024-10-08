'use client'

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config"; // Firebase config

interface TestAttempt {
  testID: string;
  awaScore: number;
  verbal1Score: number;
  verbal2Score: number;
  quant1Score: number;
  quant2Score: number;
  completionDate: any;
}

export function PreviousResultsComponentLoggedIn() {
  const { user, isLoaded } = useUser(); // Destructure isLoaded from useUser hook
  const userID = user?.id; // Optional chaining
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);

  useEffect(() => {
    if (user) {
      const fetchTestAttempts = async () => {
        const testAttemptsSnapshot = await getDocs(collection(db, `tests/${userID}/testAttempts`));
        const attempts: TestAttempt[] = testAttemptsSnapshot.docs.map(doc => ({
          testID: doc.id,
          ...doc.data(),
        })) as TestAttempt[];
        setTestAttempts(attempts);
      };
      fetchTestAttempts();
    }
  }, [user]);

  // Calculate metrics
  const totalTestsTaken = testAttempts.length;
  const averageScore = totalTestsTaken > 0
    ? (testAttempts.reduce((sum, attempt) =>
      sum + (260 + Math.ceil(attempt.verbal1Score + attempt.verbal2Score + attempt.quant1Score + attempt.quant2Score)), 0) / totalTestsTaken).toFixed(1)
    : 0;
  const highestScore = totalTestsTaken > 0
    ? Math.max(...testAttempts.map(attempt =>
      ((attempt.verbal1Score + attempt.verbal2Score + 130 + attempt.quant1Score + attempt.quant2Score + 130))))
      .toFixed(1)
    : 0;
  const averageVerbalScore = totalTestsTaken > 0
    ? (testAttempts.reduce((sum, attempt) => sum + (attempt.verbal1Score + attempt.verbal2Score + 130), 0) / totalTestsTaken).toFixed(1)
    : 0;
  const averageQuantScore = totalTestsTaken > 0
    ? (testAttempts.reduce((sum, attempt) => sum + (attempt.quant1Score + attempt.quant2Score + 130), 0) / totalTestsTaken).toFixed(1)
    : 0;


  const handleReviewClick = (testID: string, attemptData: TestAttempt) => {
    // Store attempt data in session storage
    sessionStorage.setItem('selectedTestAttempt', JSON.stringify(attemptData));

    // Redirect to the result dashboard page
    window.location.href = `/tests/${testID}?resultDashboard=true`;
  };

  if (!isLoaded) {
    // While user data is loading, you can show a loader or placeholder
    return <div>Loading user data...</div>;
  }

  if (!user) {
    return <div>Please log in to see your previous results.</div>;
  }
  return (
    <div className="mt-5 rounded-lg min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">Previous Results</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTestsTaken}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highestScore}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Verbal Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageVerbalScore}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Quant Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageQuantScore}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Score Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={testAttempts.map(attempt => ({
                date: new Date(attempt.completionDate.seconds * 1000).toLocaleDateString(), // Convert timestamp to date
                overallScore: 260 + attempt.verbal1Score + attempt.verbal2Score + attempt.quant1Score + attempt.quant2Score, // Calculate overall score
                verbalScore: attempt.verbal1Score + attempt.verbal2Score + 130, // Verbal score
                quantScore: attempt.quant1Score + attempt.quant2Score + 130,   // Quant score
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="overallScore" stroke="#8884d8" name="Overall Score" />
                <Line type="monotone" dataKey="verbalScore" stroke="#82ca9d" name="Verbal Score" />
                <Line type="monotone" dataKey="quantScore" stroke="#ffc658" name="Quant Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={testAttempts.map(attempt => ({
                date: new Date(attempt.completionDate.seconds * 1000).toLocaleDateString(), // Convert timestamp to date
                verbalScore: attempt.verbal1Score + attempt.verbal2Score + 130, // Verbal score
                quantScore: attempt.quant1Score + attempt.quant2Score + 130,    // Quant score
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="verbalScore" fill="#82ca9d" name="Verbal Score" />
                <Bar dataKey="quantScore" fill="#ffc658" name="Quant Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Verbal</TableHead>
                  <TableHead>Quant</TableHead>
                  <TableHead>Writing</TableHead>
                  <TableHead>Test Taken</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testAttempts.map(attempt => (
                  <TableRow key={attempt.testID}>
                    <TableCell>{new Date(attempt.completionDate.seconds * 1000).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                      // variant={result.score >= 90 ? "success" : result.score >= 70 ? "warning" : "destructive"}
                      >
                        {/* {((attempt.verbal2Score + attempt.verbal2Score + 130 + attempt.quant1Score + attempt.quant2Score + 130) / 340) * 100}% */}
                        {(attempt.verbal1Score + attempt.verbal2Score + 130 + attempt.quant1Score + attempt.quant2Score + 130)}
                      </Badge>
                    </TableCell>
                    <TableCell>{attempt.verbal1Score + attempt.verbal2Score + 130}</TableCell>
                    <TableCell>{attempt.quant1Score + attempt.quant2Score + 130}</TableCell>
                    {/* <TableCell>{result.totalQuestions}</TableCell> */}
                    <TableCell>{attempt.awaScore}</TableCell>
                    {/* <TableCell>{result.timeTaken}</TableCell> */}
                    <TableCell>{attempt.testID}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleReviewClick(attempt.testID, attempt)}>
                        Go to Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
            <span className="font-medium">20</span> results
          </p>
          <div className="flex-1 flex justify-end">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
              <Button variant="outline" size="icon">
                <span className="sr-only">Previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  )
}