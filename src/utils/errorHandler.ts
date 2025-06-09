
import { toast } from "@/hooks/use-toast";

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}

export class ErrorHandler {
  static handle(error: any, context?: string): void {
    console.error(`Error in ${context || 'Application'}:`, error);

    let userMessage = "An unexpected error occurred";
    let title = "Error";

    // Handle different error types
    if (error?.message?.includes('fetch')) {
      userMessage = "Network error. Please check your internet connection.";
      title = "Connection Error";
    } else if (error?.message?.includes('timeout')) {
      userMessage = "Request timed out. Please try again.";
      title = "Timeout Error";
    } else if (error?.message?.includes('unauthorized')) {
      userMessage = "You don't have permission to perform this action.";
      title = "Authorization Error";
    } else if (error?.message?.includes('not found')) {
      userMessage = "The requested resource was not found.";
      title = "Not Found";
    } else if (error?.code === 'PGRST116') {
      userMessage = "No data found matching your request.";
      title = "No Data";
    } else if (error?.message) {
      userMessage = error.message;
    }

    // Show toast notification
    toast({
      title,
      description: userMessage,
      variant: "destructive"
    });

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.logToService(error, context);
    }
  }

  static logToService(error: any, context?: string): void {
    // In a real application, you would send this to an error tracking service
    // like Sentry, LogRocket, or a custom logging endpoint
    const errorLog = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // For demo purposes, we'll just log to console
    console.log('Error logged:', errorLog);
  }

  static async withErrorHandling<T>(
    operation: () => Promise<T>,
    context?: string
  ): Promise<T | null> {
    try {
      return await operation();
    } catch (error) {
      this.handle(error, context);
      return null;
    }
  }
}

// Utility function for safe async operations
export const safeAsync = async <T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Safe async operation failed:', error);
    return fallback;
  }
};

// Utility for validating data
export const validateRequired = (data: Record<string, any>, fields: string[]): boolean => {
  for (const field of fields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      throw new Error(`${field} is required`);
    }
  }
  return true;
};

// Utility for sanitizing input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>\"'&]/g, '');
};
