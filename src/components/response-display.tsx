"use client"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Copy } from "lucide-react"

interface ResponseDisplayProps {
  response: any
  error: string | null
}

export function ResponseDisplay({ response, error }: ResponseDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("formatted")
  const copiedTimeoutRef = useRef<number | null>(null)

  // Define copyToClipboard before any conditional returns
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)

    // Clear any existing timeout
    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current)
    }

    // Set a new timeout
    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopied(false)
      copiedTimeoutRef.current = null
    }, 2000)
  }, [])

  // No need to render if there's no response or error
  if (!response && !error) return null

  if (error) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  const responseString = JSON.stringify(response, null, 2)

  return (
    <Card className="mt-6 border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/50">
        <CardTitle className="text-lg">Response</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(responseString)}
          className="h-8 px-2 text-xs"
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="formatted"
              className="flex-1 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none py-3"
            >
              Formatted
            </TabsTrigger>
            <TabsTrigger
              value="raw"
              className="flex-1 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none py-3"
            >
              Raw
            </TabsTrigger>
          </TabsList>
          <div className="p-4">
            <TabsContent value="formatted" className="mt-0">
              <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs">{responseString}</pre>
            </TabsContent>
            <TabsContent value="raw" className="mt-0">
              <div className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs break-all">
                {JSON.stringify(response)}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
