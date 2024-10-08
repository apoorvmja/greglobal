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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export function PreviousResultsComponentNotLogged() {
  // Mock data for demonstration purposes
  const results = [
    { id: 1, date: "2023-05-15", score: 85, verbalScore: 82, quantScore: 88, totalQuestions: 50, timeTaken: "45:30", accuracy: 0.85 },
    { id: 2, date: "2023-05-10", score: 92, verbalScore: 90, quantScore: 94, totalQuestions: 50, timeTaken: "42:15", accuracy: 0.92 },
    { id: 3, date: "2023-05-05", score: 78, verbalScore: 75, quantScore: 81, totalQuestions: 50, timeTaken: "48:45", accuracy: 0.78 },
    { id: 4, date: "2023-04-30", score: 88, verbalScore: 86, quantScore: 90, totalQuestions: 50, timeTaken: "44:20", accuracy: 0.88 },
    { id: 5, date: "2023-04-25", score: 95, verbalScore: 93, quantScore: 97, totalQuestions: 50, timeTaken: "40:55", accuracy: 0.95 },
  ]

  const averageScore = results.reduce((sum, result) => sum + result.score, 0) / results.length
  const averageVerbalScore = results.reduce((sum, result) => sum + result.verbalScore, 0) / results.length
  const averageQuantScore = results.reduce((sum, result) => sum + result.quantScore, 0) / results.length
  const medianScore = results.map(r => r.score).sort((a, b) => a - b)[Math.floor(results.length / 2)]
  const bestPerformingTest = results.reduce((best, current) => current.score > best.score ? current : best)
  const worstPerformingTest = results.reduce((worst, current) => current.score < worst.score ? current : worst)

  const sectionAccuracy = [
    { section: "Verbal", accuracy: averageVerbalScore / 100 },
    { section: "Quantitative", accuracy: averageQuantScore / 100 },
    { section: "Overall", accuracy: averageScore / 100 },
  ]

  const heatmapData = results.map(result => ({
    date: result.date,
    Verbal: result.verbalScore,
    Quantitative: result.quantScore,
  }))

  return (
    <div className="rounded-lg mt-5 min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row gap-2 items-center text-center justify-center">
            <h1 className="text-2xl font-semibold">Previous Results</h1>
            <h3>(LogIn to See Live Results)</h3>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.max(...results.map((r) => r.score))}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Verbal Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageVerbalScore.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Quant Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageQuantScore.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Median Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{medianScore}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Last 5 Test Score Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.slice().reverse()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" name="Overall Score" />
                  <Line type="monotone" dataKey="verbalScore" stroke="#82ca9d" name="Verbal Score" />
                  <Line type="monotone" dataKey="quantScore" stroke="#ffc658" name="Quant Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Accuracy Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.slice().reverse()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#8884d8" name="Accuracy" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Best Performing Test Attempt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Date: {bestPerformingTest.date}</p>
              <p className="text-lg font-semibold">Score: {bestPerformingTest.score}%</p>
              <p>Verbal: {bestPerformingTest.verbalScore}%</p>
              <p>Quant: {bestPerformingTest.quantScore}%</p>
              <p>Time Taken: {bestPerformingTest.timeTaken}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Worst Performing Test Attempt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Date: {worstPerformingTest.date}</p>
              <p className="text-lg font-semibold">Score: {worstPerformingTest.score}%</p>
              <p>Verbal: {worstPerformingTest.verbalScore}%</p>
              <p>Quant: {worstPerformingTest.quantScore}%</p>
              <p>Time Taken: {worstPerformingTest.timeTaken}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={heatmapData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Verbal" fill="#8884d8" />
                  <Bar dataKey="Quantitative" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accuracy in Section</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={sectionAccuracy}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="section" />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} />
                  <Radar name="Accuracy" dataKey="accuracy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

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
                  <TableHead>Questions</TableHead>
                  <TableHead>Time Taken</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>
                      <Badge
                      // variant={result.score >= 90 ? "success" : result.score >= 70 ? "warning" : "destructive"}
                      >
                        {result.score}%
                      </Badge>
                    </TableCell>
                    <TableCell>{result.verbalScore}%</TableCell>
                    <TableCell>{result.quantScore}%</TableCell>
                    <TableCell>{result.totalQuestions}</TableCell>
                    <TableCell>{result.timeTaken}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
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