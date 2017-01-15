(ns com.formious.routes.api.experiments
  (:require [com.formious.common :refer [no-content created]]
            [com.formious.db.experiment :as Experiment]
            [com.formious.routes.api.experiments.blocks]
            [compojure.coercions :refer [as-int]]
            [compojure.core :refer [GET PATCH POST PUT DELETE context defroutes]]))

(defroutes routes
  (context "/experiments" [] com.formious.routes.api.experiments.blocks/routes)
  (GET "/" []
    ; experiments.foreach { experiment => Experiment.findOrCreateAccessToken(experiment.id) }
    (Experiment/all))
  (GET "/new" []
    (Experiment/blank))
  (POST "/" {{:strs [name administrator_id html]} :body}
    (-> (Experiment/insert! name administrator_id html) (created)))
  (GET "/:id" [id :<< as-int]
    ;Experiment.findOrCreateAccessToken(experiment.id)
    ;NotFound(new Exception("Experiment not found"))
    (Experiment/find-by-id id))
  (POST "/:id" [id :<< as-int :as {{:strs [name administrator_id html]} :body}]
    (Experiment/update! id name administrator_id html)
    (no-content))
  (DELETE "/:id" [id :<< as-int]
    (Experiment/delete! id)
    (no-content)))