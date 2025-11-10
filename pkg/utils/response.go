package utils

type SuccessResponse struct {
	StatusCode int         `json:"status_code" validate:"required"`
	Message    string      `json:"message" validate:"required"`
	Data       interface{} `json:"data" validate:"required"`
}

type ErrorResponse struct {
	StatusCode int    `json:"status_code" validate:"required"`
	Message    string `json:"message" validate:"required"`
	Error      string `json:"error" validate:"required"`
}

func ConvertToSuccessResponse(statusCode int, message string, data interface{}) SuccessResponse {
	return SuccessResponse{
		StatusCode: statusCode,
		Message:    message,
		Data:       data,
	}
}

func ConvertToErrorResponse(statusCode int, message string, error string) ErrorResponse {
	return ErrorResponse{
		StatusCode: statusCode,
		Message:    message,
		Error:      error,
	}
}
