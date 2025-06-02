export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_assets: {
        Row: {
          api_call_count: number | null
          asset_type: Database["public"]["Enums"]["asset_type"]
          created_at: string
          current_price: number | null
          custom_license_terms: string | null
          description: string | null
          download_count: number | null
          file_path: string | null
          github_url: string | null
          id: string
          initial_price: number | null
          license_type: Database["public"]["Enums"]["license_type"]
          model_url: string | null
          name: string
          owner_id: string
          rating: number | null
          rating_count: number | null
          status: Database["public"]["Enums"]["asset_status"] | null
          tags: string[] | null
          ticker_symbol: string
          total_revenue: number | null
          updated_at: string
        }
        Insert: {
          api_call_count?: number | null
          asset_type: Database["public"]["Enums"]["asset_type"]
          created_at?: string
          current_price?: number | null
          custom_license_terms?: string | null
          description?: string | null
          download_count?: number | null
          file_path?: string | null
          github_url?: string | null
          id?: string
          initial_price?: number | null
          license_type: Database["public"]["Enums"]["license_type"]
          model_url?: string | null
          name: string
          owner_id: string
          rating?: number | null
          rating_count?: number | null
          status?: Database["public"]["Enums"]["asset_status"] | null
          tags?: string[] | null
          ticker_symbol: string
          total_revenue?: number | null
          updated_at?: string
        }
        Update: {
          api_call_count?: number | null
          asset_type?: Database["public"]["Enums"]["asset_type"]
          created_at?: string
          current_price?: number | null
          custom_license_terms?: string | null
          description?: string | null
          download_count?: number | null
          file_path?: string | null
          github_url?: string | null
          id?: string
          initial_price?: number | null
          license_type?: Database["public"]["Enums"]["license_type"]
          model_url?: string | null
          name?: string
          owner_id?: string
          rating?: number | null
          rating_count?: number | null
          status?: Database["public"]["Enums"]["asset_status"] | null
          tags?: string[] | null
          ticker_symbol?: string
          total_revenue?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      asset_reviews: {
        Row: {
          asset_id: string
          created_at: string
          id: string
          rating: number
          review_text: string | null
          reviewer_id: string
        }
        Insert: {
          asset_id: string
          created_at?: string
          id?: string
          rating: number
          review_text?: string | null
          reviewer_id: string
        }
        Update: {
          asset_id?: string
          created_at?: string
          id?: string
          rating?: number
          review_text?: string | null
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_reviews_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "ai_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_transactions: {
        Row: {
          amount: number
          asset_id: string
          buyer_id: string | null
          created_at: string
          id: string
          payment_method: string | null
          royalty_amount: number
          transaction_type: string
        }
        Insert: {
          amount: number
          asset_id: string
          buyer_id?: string | null
          created_at?: string
          id?: string
          payment_method?: string | null
          royalty_amount: number
          transaction_type: string
        }
        Update: {
          amount?: number
          asset_id?: string
          buyer_id?: string | null
          created_at?: string
          id?: string
          payment_method?: string | null
          royalty_amount?: number
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "ai_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          asset_id: string
          id: string
          price: number
          timestamp: string
          volume: number | null
        }
        Insert: {
          asset_id: string
          id?: string
          price: number
          timestamp?: string
          volume?: number | null
        }
        Update: {
          asset_id?: string
          id?: string
          price?: number
          timestamp?: string
          volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "price_history_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "ai_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          company: string | null
          created_at: string
          full_name: string | null
          github_username: string | null
          id: string
          total_earnings: number | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          github_username?: string | null
          id: string
          total_earnings?: number | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          github_username?: string | null
          id?: string
          total_earnings?: number | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_ticker_symbol: {
        Args: { asset_name: string }
        Returns: string
      }
      update_asset_price: {
        Args: { asset_id_param: string }
        Returns: number
      }
    }
    Enums: {
      asset_status: "pending" | "approved" | "rejected" | "delisted"
      asset_type:
        | "model"
        | "dataset"
        | "api"
        | "framework"
        | "tool"
        | "company_share"
      license_type:
        | "mit"
        | "apache"
        | "commercial"
        | "proprietary"
        | "cc0"
        | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      asset_status: ["pending", "approved", "rejected", "delisted"],
      asset_type: [
        "model",
        "dataset",
        "api",
        "framework",
        "tool",
        "company_share",
      ],
      license_type: [
        "mit",
        "apache",
        "commercial",
        "proprietary",
        "cc0",
        "custom",
      ],
    },
  },
} as const
