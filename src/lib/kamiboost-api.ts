/**
 * Kamiboost API Integration
 * Base URL: https://kamiboost.com/api/v2
 */

const API_BASE_URL = 'https://kamiboost.com/api/v2';

export interface KamiboostService {
  service: number;
  name: string;
  type: string;
  category: string;
  rate: string;
  min: string;
  max: string;
  refill: boolean;
  cancel: boolean;
}

export interface KamiboostOrderResponse {
  order: number;
}

export interface KamiboostStatusResponse {
  charge: string;
  start_count: string;
  status: string;
  remains: string;
  currency: string;
}

export interface KamiboostBalanceResponse {
  balance: string;
  currency: string;
}

export interface KamiboostRefillResponse {
  refill: string;
}

export interface ApiError {
  error: string;
}

/**
 * Get user's API key from localStorage
 */
function getApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('kamiboost_api_key');
}

/**
 * Make API request to Kamiboost
 */
async function apiRequest<T>(action: string, params: Record<string, any>): Promise<T> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('API key not found. Please add your API key in account settings.');
  }

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('action', action);
  
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error);
  }

  return data as T;
}

/**
 * Get all available services
 */
export async function getServices(): Promise<KamiboostService[]> {
  return apiRequest<KamiboostService[]>('services', {});
}

/**
 * Place a new order
 */
export async function placeOrder(params: {
  service: number;
  link: string;
  quantity: number;
  runs?: number;
  interval?: number;
}): Promise<KamiboostOrderResponse> {
  return apiRequest<KamiboostOrderResponse>('add', params);
}

/**
 * Get order status
 */
export async function getOrderStatus(orderId: number): Promise<KamiboostStatusResponse> {
  return apiRequest<KamiboostStatusResponse>('status', { order: orderId });
}

/**
 * Get multiple orders status
 */
export async function getMultipleOrdersStatus(orderIds: number[]): Promise<Record<string, KamiboostStatusResponse | ApiError>> {
  return apiRequest<Record<string, KamiboostStatusResponse | ApiError>>('status', { 
    orders: orderIds.join(',') 
  });
}

/**
 * Get user balance
 */
export async function getBalance(): Promise<KamiboostBalanceResponse> {
  return apiRequest<KamiboostBalanceResponse>('balance', {});
}

/**
 * Request refill for an order
 */
export async function requestRefill(orderId: number): Promise<KamiboostRefillResponse> {
  return apiRequest<KamiboostRefillResponse>('refill', { order: orderId });
}

/**
 * Request refill for multiple orders
 */
export async function requestMultipleRefill(orderIds: number[]): Promise<Array<{ order: number; refill: string | ApiError }>> {
  return apiRequest<Array<{ order: number; refill: string | ApiError }>>('refill', { 
    orders: orderIds.join(',') 
  });
}

/**
 * Get refill status
 */
export async function getRefillStatus(refillId: number): Promise<{ status: string }> {
  return apiRequest<{ status: string }>('refill_status', { refill: refillId });
}

/**
 * Save API key to localStorage
 */
export function saveApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('kamiboost_api_key', key);
  }
}

/**
 * Remove API key
 */
export function removeApiKey(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('kamiboost_api_key');
  }
}

/**
 * Check if API key is set
 */
export function hasApiKey(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('kamiboost_api_key');
}
